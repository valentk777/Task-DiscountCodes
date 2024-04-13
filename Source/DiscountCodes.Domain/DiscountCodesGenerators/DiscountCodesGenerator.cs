using Microsoft.Extensions.Logging;

namespace DiscountCodes.Domain.DiscountCodesGenerators;

public class DiscountCodesGenerator : IDiscountCodesGenerator
{
    private readonly ILogger<DiscountCodesGenerator> _logger;
    private readonly IDiscountCodesRepository _repository;

    public DiscountCodesGenerator(ILogger<DiscountCodesGenerator> logger, IDiscountCodesRepository repository)
    {
        _logger = logger;
        _repository = repository;
    }

    public async Task<bool> GenerateCodes(ushort count, byte length)
    {
        try
        {
            var allCodes = await _repository.GetAllDiscountCodes();

            var newCodes = Enumerable.Range(0, count)
                .Select(_ => GenerateUniqueCode(allCodes, length))
                .ToList();

            await _repository.AddDiscountCodes(newCodes);

            return true;
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "Issues generating code {Exception}", exception);

            return false;
        }
    }

    private NewDiscountCode GenerateUniqueCode(IEnumerable<string> existingCodes, byte length)
    {
        // this code is not threadsafe and not concurrency prone.
        // to make it thread-safe, we can use:
        // 1. locks, but then we will lose performance
        // 2. ConcurrentBag to store all keys and update the resolved ones concurently
        // 3. Implement logical try/error flow. Generate code, try to save to database, get error on saving, regenerate code again
        NewDiscountCode candidateCode = GenerateCode(length);

        while (existingCodes.Contains(candidateCode.Code))
        {
            candidateCode = GenerateCode(length);
        }

        return candidateCode;
    }

    private NewDiscountCode GenerateCode(byte length) =>
        new NewDiscountCode(Guid.NewGuid().ToString("N")[..length], false, DateTime.UtcNow);
}

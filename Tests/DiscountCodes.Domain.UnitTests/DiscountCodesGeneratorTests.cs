using DiscountCodes.Domain.DiscountCodesGenerators;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;

namespace DiscountCodes.Domain.UnitTests;

public class DiscountCodesGeneratorTests
{
    private DiscountCodesGenerator _generator;
    private Mock<IDiscountCodesRepository> _mockRepository;
    private Mock<ILogger<DiscountCodesGenerator>> _mockLogger;

    [SetUp]
    public void Setup()
    {
        _mockRepository = new Mock<IDiscountCodesRepository>();
        _mockLogger = new Mock<ILogger<DiscountCodesGenerator>>();
        _generator = new DiscountCodesGenerator(_mockLogger.Object, _mockRepository.Object);
    }

    [Test]
    public async Task GenerateCodes_WhenSuccessful_ReturnsTrue()
    {
        // Arrange
        ushort count = 2;
        byte length = 8;
        var existingCodes = new List<string> { "12345678", "12345679" };
        var response = new List<DiscountCode>();
        _mockRepository.Setup(r => r.GetAllDiscountCodes()).ReturnsAsync(existingCodes);
        _mockRepository.Setup(r => r.AddDiscountCodes(It.IsAny<IReadOnlyCollection<NewDiscountCode>>())).ReturnsAsync(response);

        // Act
        var result = await _generator.GenerateCodes(count, length);

        // Assert
        Assert.That(result, Is.True);
    }

    [Test]
    public async Task GenerateCodes_WhenExceptionThrown_ReturnsFalse()
    {
        // Arrange
        ushort count = 5;
        byte length = 8;
        _mockRepository.Setup(r => r.GetAllDiscountCodes()).ThrowsAsync(new Exception("Test exception"));

        // Act
        var result = await _generator.GenerateCodes(count, length);

        // Assert
        Assert.That(result, Is.False);
    }
}

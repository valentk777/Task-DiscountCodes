using DiscountCodes.Domain.DiscountCodesActivators;
using DiscountCodes.Domain.Exceptions;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;

namespace DiscountCodes.Domain.UnitTests;

public class DiscountCodesActivatorTests
{
    private DiscountCodesActivator _activator;
    private Mock<IDiscountCodesRepository> _mockRepository;
    private Mock<ILogger<DiscountCodesActivator>> _mockLogger;

    [SetUp]
    public void Setup()
    {
        _mockRepository = new Mock<IDiscountCodesRepository>();
        _mockLogger = new Mock<ILogger<DiscountCodesActivator>>();
        _activator = new DiscountCodesActivator(_mockLogger.Object, _mockRepository.Object);
    }

    [Test]
    public async Task GetDiscountCode_WhenCodeExists_ReturnsDiscountCode()
    {
        // Arrange
        var code = "VALID_CODE";
        var discountCode = new DiscountCode(1, code, false, DateTime.UtcNow);
        var updatedDiscountCode = new DiscountCode(1, code, true, DateTime.UtcNow);
        _mockRepository.Setup(r => r.GetDiscountCode(code)).ReturnsAsync(discountCode);
        _mockRepository.Setup(r => r.UpdateDiscountCode(It.IsAny<DiscountCode>())).ReturnsAsync(updatedDiscountCode);

        // Act
        var result = await _activator.GetDiscountCode(code);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Code, Is.EqualTo(code));
        Assert.That(result.IsUsed, Is.True);
    }

    [Test]
    public async Task GetDiscountCode_WhenCodeDoesNotExist_ThrowsDomainValidationException()
    {
        // Arrange
        var invalidCode = "INVALID_CODE";
        _mockRepository.Setup(r => r.GetDiscountCode(invalidCode)).ReturnsAsync((DiscountCode)null);

        // Act
        var func = () => _activator.GetDiscountCode(invalidCode);

        // Assert
        var ex = Assert.ThrowsAsync<DomainValidationException>(() => func());
        Assert.That(ex.Message, Is.EqualTo("Cannot find provided code"));
    }

    [Test]
    public async Task GetDiscountCode_WhenCodeIsAlreadyUsed_ThrowsDomainValidationException()
    {
        // Arrange
        var code = "USED_CODE";
        var usedDiscountCode = new DiscountCode(1, code, true, DateTime.UtcNow);
        _mockRepository.Setup(r => r.GetDiscountCode(code)).ReturnsAsync(usedDiscountCode);

        // Act
        var func = () => _activator.GetDiscountCode(code);

        // Assert
        var ex = Assert.ThrowsAsync<DomainValidationException>(() => func());
        Assert.That(ex.Message, Is.EqualTo("Provided code has been used already"));
    }
}

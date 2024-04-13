namespace DiscountCodes.Domain.Exceptions;

public class DomainValidationException(string message) : Exception(message);

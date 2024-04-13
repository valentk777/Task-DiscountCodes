# Task-DiscountCodes
This is a solution for a task to generate a discount code
Original task/requirements:
https://github.com/valentk777/Task-DiscountCodes/blob/main/Documentation/Original_Task.pdf

The solution using Clean Architecture and Domain Driven Design (DDD) for this looks overengineering. 
And it is, but the key idea I wanted to deliver with this solution, is that I am capable of programming big solutions with much richer domains than this task. 
It is easy to scale and maintain, decoupled from integrations and communication protocols. 
In case you want to build a REST communication entry point, well, you can do that without changing the actual domain.
 That is my key target.

## Features/Keywords:
- FrontEnd/UI:
    * React 
    
- BackEnd:
    * DotNet 8
    * UnitTests
    * IntegrationTests
    * Entity Framework
    * DDD
    * Logging

- Communication:
    * SignalR

- Infrastructure:
    * CI/CD with GitHub Actions
    * MySql database
    * Automatic test runs
    * SonarCloud automatic scan
    * Swagger Documentation
    * Postman Documentation
    * Docker and docker compose
    * Release as docker image to GitHub image storage
    * EF migrations

## How to run the app?

To run the application locally for testing, you can use a docker-compose file.
For this, you need to have docker up and running (Docker Desktop or free option Rancher will work).

In the CMD inside the main project repo, just run
```
docker-compose up
dotnet ef database update --startup-project Source/DiscountCodes.SignalR --project Source/DiscountCodes.Integrations
```

Then open URL: http://localhost:3000/

## EF migrations
```bash
dotnet ef migrations add create-discount-code-table --startup-project Source/DiscountCodes.SignalR --project Source/DiscountCodes.Integrations
dotnet ef database update --startup-project Source/DiscountCodes.SignalR --project Source/DiscountCodes.Integrations
```


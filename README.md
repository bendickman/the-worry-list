# The Worry List

## Development Environment

The project was built using Visual Studio Code targeting .NET 6 & React 18

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Architecture Overview

The architecture approach for this application has taken inspiration from Jason Taylor's [Clean Architecture](https://github.com/jasontaylordev/CleanArchitecture)

### TheWorryList.Api

Web API targeting .NET Core 6 that provides all the endpoints of the application (details to follow)

#### TheWorryList.Application

Feature implementation using MediatR

#### TheWorryList.Domain

Domain entities used throughout the application

### TheWorryList.Persistence

Data access including migration and seed data

### TheWorryList.Infrastructure

Utility classes such as email sender

### client-app

React 18 client-side application that interacts with the backend Web API

## Technologies

* [.NET 6](https://docs.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core?view=aspnetcore-6.0)
* [React 18](https://reactjs.org/)
* [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
* [SqLite](https://www.sqlite.org/index.html) (dev) & [PostgreSQL](https://www.postgresql.org/) (production)
* [Swagger](https://swagger.io/)
* [JWT Authentication & Authorization](https://jwt.io/)
* [MediatR](https://github.com/jbogard/MediatR)

## API Endpoints

Details to follow


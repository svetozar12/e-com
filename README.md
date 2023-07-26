# E-COM-MICROSERVICES

This is an learning project about fullstack app(E-COM) which involves microservices

## Run Locally

Clone the project

```bash
  git clone https://github.com/svetozar12/e-com-microservice
```

Go to the project directory

```bash
  cd e-com-microservice
```

Install dependencies

```bash
  yarn
```

Build all projects

```bash
  yarn build:all
```

To start everything

```bash
  yarn serve:all
```

## Running Tests

To run tests, run the following command

```bash
  yarn test:all
```

## Documentation

[User Service](./apps/services/user/docs/README.md)
[Product Catalog Service](./apps/services/product-catalog/docs/README.md)
[Aggregator Service](./apps/services/aggregator/docs/README.md)

Certainly! Here's an idea for a project that combines GraphQL, microservices, and Go:

Project Idea: E-commerce Platform

Description: Build an e-commerce platform that allows users to browse products, add them to a cart, and complete the checkout process. The system will consist of multiple microservices to handle different aspects of the platform.

Microservices:

Product Catalog Service: Manage product information, including details, pricing, and availability. It exposes GraphQL queries to retrieve product data based on various criteria.

Cart Service: Manage user shopping carts and handle operations like adding items, removing items, and updating quantities. It exposes GraphQL mutations to interact with the cart.

Order Service: Handle the order placement and management process. It manages the creation, modification, and retrieval of orders and exposes GraphQL queries and mutations related to order processing.

Payment Service: Interface with a payment gateway to handle payment transactions securely. It communicates with external payment providers and integrates their APIs with the system.

Inventory Service: Keep track of product inventory levels to ensure availability and prevent overselling. It manages inventory updates and provides real-time information about product availability.

Review Service: Allow users to leave reviews and ratings for products. It provides GraphQL mutations for submitting reviews and queries to retrieve product ratings and reviews.

Notification Service: Send notifications to users about order updates, promotions, and other relevant events. It can utilize email or push notification services to deliver notifications.

Architecture and Integration:

Each microservice should have its own data storage, such as a relational database or NoSQL solution, based on its specific requirements.
Use asynchronous communication techniques like message queues or event-driven architectures to decouple microservices and ensure reliable communication.
Additional Features:

Implement search functionality to allow users to search for products based on keywords, categories, or other criteria.
Enable user wishlists to allow users to save products for future reference or purchase.
Implement recommendation functionality that suggests related products based on user browsing and purchase history.
Develop an admin dashboard to manage products, inventory, and orders.
Implement caching mechanisms to improve performance and reduce load on the microservices.
Remember to plan and design the project thoroughly before diving into implementation. Break down the functionalities into smaller tasks and allocate time accordingly. Don't forget to document your progress and showcase your work in your portfolio.

I hope this idea inspires you to create an exciting project combining GraphQL, microservices, and Go!

# PF_Backend API Documentation

Portfolio/Showcase Project

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Routes](#routes)
- [Authentication](#authentication)
- [Usage](#usage)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following:

- Node.js and npm installed
- PostgreSQL Server or Cloud Instance

## Getting Started

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Configure your PostgreSQL connection in the `config.yml` file.
4. Build server.js using `tsc`
5. Copy `config.yml` from the root directory to build directory.
6. Run the application using `node build/server.js`

#### Alternative

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Configure your PostgreSQL connection in the `config.yml` file.
4. Create folder named `build` into root directory and copy `config.yml` there.
5. Run `npm start`

## Routes

### Customer Routes

- `GET /api/customers` - Get a list of all customers. (Requires authentication)
- `GET /api/customers/:id` - Get a specific customer by ID. (Requires authentication)
- `POST /api/customers` - Create a new customer. (Requires authentication)
- `PUT /api/customers/:id` - Update an existing customer by ID. (Requires authentication)
- `DELETE /api/customers/:id` - Delete a customer by ID. (Requires authentication)

### Ping Routes

- `GET /api/ping` - Check if the server is running.
- `GET /api/ping/verify` - Verify a ping token.

### User Routes

- `GET /api/users` - Get a list of all management users. (Requires authentication)
- `GET /api/users/:id` - Get a specific management user by ID. (Requires authentication)
- `POST /api/users/signin` - Sign In using management user credentials.

## Authentication

Authentication is required for certain routes to ensure secure access to the API. The `RequireAuthentication` middleware is used to verify the user's token before granting access. Tokens can be obtained by signing in using the `/api/users/signin` route.

## Usage

1. Obtain an authentication token by signing in using the `/api/users/signin` route.
2. Use the obtained token in the `Authorization` header for routes that require authentication.
3. Make requests to the API endpoints according to the provided routes.

## License
This project is licensed under the MIT License.

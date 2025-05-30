# Pet Reminder Backend

A backend service for managing pet-related reminders and tasks.

## Features

- Manage pet reminders and tasks
- Database-driven storage
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/vanshsingh2002/pet-remainder-b
cd pet-remainder-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and configure your environment variables:
```env
PORT=3000
```

## Running the Application

To start the development server:
```bash
npm start
```

The server will start on the configured port (default: 3000).

## API Endpoints

The API provides the following endpoints:

- `GET /reminders` - Get all reminders
- `POST /reminders` - Create a new reminder
- `GET /reminders/:id` - Get a specific reminder
- `PUT /reminders/:id` - Update a reminder
- `DELETE /reminders/:id` - Delete a reminder

## Database

The application uses SQLite as its database, with the database file stored as `reminders.db`.

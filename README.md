# TaskAPI

## Overview
TaskAPI is a simple task management application built with Node.js, Express, TypeORM, and SQLite. It provides a RESTful API for managing tasks and includes a basic frontend interface for interacting with the API.

## Project Structure
```
TaskAPI/
├── database.sqlite         # SQLite database file
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── src/
│   ├── data-source.ts      # Database configuration
│   ├── server.ts           # Main application entry point
│   ├── entities/
│   │   └── Task.ts         # Task entity definition
│   ├── routes/
│   │   └── taskRoutes.ts   # API routes for task management
│   ├── frontend/
│       ├── index.html      # Frontend HTML file
│       └── script.js       # Frontend JavaScript file
```

## Features
### Backend
- RESTful API for managing tasks
- SQLite database integration using TypeORM
- CORS support for cross-origin requests
- Static file serving for the frontend

### Frontend
- View a list of tasks
- Add new tasks
- Mark tasks as completed
- Delete tasks

## API Endpoints
### Tasks
- **GET /tasks**: Retrieve all tasks
- **POST /tasks**: Create a new task
  - Request body: `{ "title": "Task title" }`
- **PUT /tasks/:id**: Update a task's status
  - Request body: `{ "status": "completed" }`
- **DELETE /tasks/:id**: Delete a task

## Database Schema
### Task Entity
```typescript
@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ default: "Pending" })
    status: string;
}
```

## Setup and Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd TaskAPI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx ts-node src/server.ts
   ```

4. Access the application:
   - Frontend: `http://localhost:3000`
   - API: `http://localhost:3000/tasks`

## Frontend Usage
The frontend is a simple HTML and JavaScript interface that interacts with the API:
- **index.html**: Displays the task list and provides input for adding tasks.
- **script.js**: Handles API requests (fetching, adding, updating, and deleting tasks).

## CORS Configuration
The server uses the `cors` middleware with the following configuration:
```typescript
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));
```

## Development Notes
- **TypeScript**: The project is written in TypeScript for type safety and better maintainability.
- **Database Synchronization**: TypeORM automatically synchronizes the database schema with the `Task` entity.
- **Static File Serving**: The frontend files are served from the `src/frontend` directory.

## Future Improvements
- Add user authentication for secure task management.
- Implement pagination for the task list.
- Enhance the frontend with a modern framework like React or Vue.js.
- Add unit tests for API endpoints.

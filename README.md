# TaskAPI

## Overview
TaskAPI is a modern task management application built with Node.js, Express, TypeORM, and PostgreSQL, featuring a responsive web interface.

## Project Structure
```
TaskAPI/
├── src/
│   ├── entities/
│   │   └── Task.ts         # Task entity definition
│   ├── frontend/
│   │   ├── index.html      # Frontend interface
│   │   └── script.js       # Frontend logic
│   ├── routes/
│   │   └── taskRoutes.ts   # API endpoints
│   ├── data-source.ts      # Database configuration
│   └── server.ts           # Application entry point
├── .env                    # Environment variables
└── vercel.json             # Vercel deployment config
```

## Tech Stack
- **Backend:**
  - Node.js with TypeScript
  - Express.js for REST API
  - TypeORM for database management
  - PostgreSQL (Supabase) as database
- **Frontend:**
  - HTML5 & JavaScript
  - TailwindCSS for styling
  - Phosphor Icons
  - Animate.css for animations

## Features
### Backend
- RESTful API endpoints
- PostgreSQL integration
- CORS support
- Static file serving
- Environment variable configuration
- Vercel deployment support

### Frontend
- Modern, responsive UI
- Real-time task updates
- Inline task editing
- Status toggling
- Visual feedback with animations
- Toast notifications

## API Endpoints

### Tasks
```typescript
GET    /tasks     // Retrieve all tasks
POST   /tasks     // Create a new task
PUT    /tasks/:id // Update task status/title
DELETE /tasks/:id // Delete a task
```

## Database Schema

```typescript
@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ default: "Pending" })
    status: string
}
```

## Setup & Installation

1. **Clone Repository:**
```bash
git clone <repository-url>
cd TaskAPI
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Environment Configuration:**
Create `.env` file:
```env
DATABASE_URL=your_postgresql_connection_string
```

4. **Start Development Server:**
```bash
npm run dev
```

## Deployment
This project is configured for Vercel deployment:

1. **Configure Vercel:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.ts",
      "use": "@vercel/node"
    }
  ]
}
```

2. **Environment Variables:**
- Add `DATABASE_URL` in Vercel dashboard
- Configure PostgreSQL connection string

## Frontend Usage
The interface provides:
- Task input with add button
- Task list with inline editing
- Status toggling
- Delete functionality
- Visual feedback
- Keyboard shortcuts

## Development Notes
- Uses TypeScript for type safety
- Automatic database synchronization
- CORS enabled for all origins
- Frontend served statically
- PostgreSQL hosted on Supabase

## Security Considerations
- Environment variables for sensitive data
- CORS configuration
- Database SSL enabled
- Input validation
- Error handling

## Future Improvements
- User authentication
- Task categories
- Due dates
- Search functionality
- Filters and sorting
- Dark mode
- Mobile app version
- Offline support

## Contributing
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License
This project is under ISC license.

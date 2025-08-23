# Surveys Web App

A web application for creating, managing, and responding to surveys. Admins can create and analyze surveys, while users can answer surveys and view their progress.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js  
- **Styling**: Material UI  
- **State Management**: React Context  
- **HTTP Client**: Axios  

### Backend
- **Runtime**: Java (OpenJDK 17)  
- **Framework**: Spring Boot  
- **Database**: PostgreSQL  
- **Authentication**: Cookie-based authentication (HTTP-only)  

---

## 📋 Prerequisites

Before running the application, make sure you have the following installed:

### Backend
- [PostgreSQL](https://www.postgresql.org/download/)  
- Java OpenJDK 17  

### Frontend
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)  

---

## 💾 Installing PostgreSQL

1. **Download and Install**  
   - Windows / macOS / Linux installers: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
2. **Start PostgreSQL**  
   ```bash
   # Linux
   sudo service postgresql start

   # macOS (with Homebrew)
   brew services start postgresql

   # Windows: Start "PostgreSQL" service from Services panel

3. Create a database

    psql -U postgres
    CREATE DATABASE surveys_db;

## 🚀 Running the Backend (Spring Boot) in VS Code

1. **Open the project in VS Code**  
2. **Install the Spring Boot Extension Pack**  
3. **Run the Application**  
   - Click the **Run** button in VS Code
4. **Verify Backend**
   - The backend should run on [http://localhost:8080](http://localhost:8080)

## 🔗 API Endpoints

### Authentication
- `POST /api/register` – User registration
- `POST /api/login` – User login

---

### Surveys (Public / Authenticated User)
- `GET /api/surveys/{id}` – Get a single survey by ID (any authenticated user)

---

### Surveys (Admin Only)
- `POST /api/admin/surveys` – Create a new survey (status initialized as `NEW`)
- `GET /api/admin/surveys` – Get all surveys (regardless of status)
- `PUT /api/admin/surveys/{id}/complete` – Mark a survey as `COMPLETE`
- `GET /api/admin/surveys/{id}/stats` – Get survey statistics (average, min, max per field + overall SUS score)
- `GET /api/admin/surveys/{id}/export` – Export survey statistics as a CSV file

---

### Surveys (User Only)
- `GET /api/user/surveys` – Get all available surveys with status `NEW`
- `POST /api/user/surveys/{id}/answer` – Submit answers for a survey (increments times answered and records user)
- `GET /api/user/surveys/{id}/can-answer` – Check if the logged-in user can still answer a specific survey

### User Info
- `GET /api/role` – Get the username and role of the currently logged-in user

## 🖼️ Screenshots


---

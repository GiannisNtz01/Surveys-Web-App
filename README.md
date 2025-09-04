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

### 👥 Users (predefined admin user)

| Username | Password   |
|----------|------------|
| admin    | adminpass  |


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

    - psql -U postgres
    - CREATE USER postgres WITH PASSWORD '1234'
    - CREATE DATABASE survey_db OWNER postgres;

---

## 🚀 Running the Backend (Spring Boot) in VS Code

1. **Open the project in VS Code**  
2. **Install the Spring Boot Extension Pack**  
3. **Run the Application**  
   - Click the **Run** button in VS Code
4. **Verify Backend**
   - The backend should run on [http://localhost:8080](http://localhost:8080)

---
  

## 🕸️ Running the Frontend (Vite+React)
1. **Open the project in VS Code**
2. **Open a terminal session**
3. `yarn install`
4. `yarn start`
  - The front should run on [http://localhost:3000](http://localhost:3000)

---

## 🔗 API Endpoints

### Authentication
- `POST /api/login` – User login
- `POST /api/register` – User register

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

### Login page

<img width="1199" height="743" alt="image" src="https://github.com/user-attachments/assets/0f9a7f4d-a684-4492-a2a6-0e374d184888" />

### Register page

<img width="1200" height="750" alt="image" src="https://github.com/user-attachments/assets/c293bbd6-b565-48c8-a006-3450ed01d0a9" />

### Admin dashboard

<img width="1209" height="889" alt="image" src="https://github.com/user-attachments/assets/82e15674-bcbc-44d5-a972-038a44a8201f" />

### Admin create survey

<img width="1203" height="932" alt="image" src="https://github.com/user-attachments/assets/748aa25d-b3e6-4add-aff1-ef591c66b9bc" />

### Admin completed survey

<img width="1198" height="683" alt="image" src="https://github.com/user-attachments/assets/7bc08dbf-87ad-4a6e-95c5-dd8c7bce9481" />

### Admin new/pending survey

<img width="1203" height="752" alt="image" src="https://github.com/user-attachments/assets/9586f7d4-d2c6-46bc-8725-697323050bf4" />

### User dashboard

<img width="1202" height="723" alt="image" src="https://github.com/user-attachments/assets/6cddb25c-b2b1-457d-ba59-c4496abdd7e2" />

### User answered survey

<img width="1209" height="592" alt="image" src="https://github.com/user-attachments/assets/284f9d44-9512-4a52-9cdc-ba6070189a4e" />

### User survey submission

<img width="1207" height="838" alt="image" src="https://github.com/user-attachments/assets/727c61ba-3138-4a5e-b449-bba74dd218ee" />

<img width="1161" height="618" alt="image" src="https://github.com/user-attachments/assets/b1ec7efb-917b-45ac-957f-eafdb95a6aa4" />









---

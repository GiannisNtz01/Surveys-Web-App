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

### 👥 Users

| Username | Password   |
|----------|------------|
| admin    | adminpass  |
| user     | userpass   |


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
    CREATE USER postgres WITH PASSWORD '1234'
    CREATE DATABASE survey_db OWNER postgres;

---

## 🚀 Running the Backend (Spring Boot) in VS Code

1. **Open the project in VS Code**  
2. **Install the Spring Boot Extension Pack**  
3. **Run the Application**  
   - Click the **Run** button in VS Code
4. **Verify Backend**
   - The backend should run on [http://localhost:8080](http://localhost:8080)

---
  

## 🕸️ Running the Fronend (Vite+React)
1. **Open the project in VS Code**
2. **Open a terminal session**
3. `yarn install`
4. `yarn start`
  - The front should run on [http://localhost:3000](http://localhost:3000)

---

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

### Login page

<img width="1219" height="739" alt="image" src="https://github.com/user-attachments/assets/d2ff591a-2df2-4b81-9f39-26e2c80f5967" />

### Admin dashboard

<img width="1209" height="889" alt="image" src="https://github.com/user-attachments/assets/82e15674-bcbc-44d5-a972-038a44a8201f" />

### Admin create survey

<img width="1203" height="932" alt="image" src="https://github.com/user-attachments/assets/748aa25d-b3e6-4add-aff1-ef591c66b9bc" />

### Admin completed survey

<img width="1199" height="516" alt="image" src="https://github.com/user-attachments/assets/b51b8cca-2e5b-4795-86a0-fd47515034a5" />

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

# Hirelytics 🚀

Hirelytics is a full-stack, AI-powered preparation platform designed to help job seekers prepare for interviews and tailor their resumes. By analyzing a candidate's resume, their self-description, and the target job description, Hirelytics provides automated mock interview prep, detects skill gaps, creates custom day-wise study plans, and generates professional, ATS-friendly resumes in PDF format.

---

## 🌟 Features

### 1. **AI Interview Prep & Roadmap Generator**
- **Match Score**: Analyzes how well your background aligns with the target job description (0–100%).
- **Technical & Behavioral Questions**: Tailored questions based on your background and the job description, along with the recruiter's underlying intent and recommended answers.
- **Skill Gap Detection**: Pinpoints critical skills missing from your profile, categorized by severity (Low, Medium, High).
- **Customized Preparation Plan**: A step-by-step, day-wise roadmap focused on closing skill gaps and preparing for interview questions.

### 2. **Tailored Resume PDF Generator**
- Generates an optimized, ATS-friendly resume tailored directly to the target job description.
- Uses Gemini to generate professional resume HTML and converts it into a high-quality A4 PDF dynamically using **Puppeteer**.

### 3. **Secure Authentication & Dashboard**
- JWT-based authentication via cookies.
- Token blacklisting on logout for security.
- Persistent user sessions and structured dashboard history.

---

## 🛠️ Tech Stack

### **Frontend**
- **React (v19)**: Component-driven user interface.
- **Vite**: Ultra-fast build tool and dev server.
- **React Router (v7)**: Client-side routing.
- **Sass (SCSS)**: Premium and modular CSS styling.
- **Axios**: Promised-based HTTP client for API requests.

### **Backend**
- **Node.js & Express (v5)**: Clean MVC structure handling request routing, file processing, and API control.
- **Mongoose & MongoDB**: Database storage for users, session blacklists, and historical interview reports.
- **Google Gemini API (`@google/genai`)**: Utilizes state-of-the-art Generative AI models (e.g., `gemini-3-flash-preview`) with Zod-structured schemas.
- **Puppeteer**: Headless Chrome rendering engine to compile HTML resumes to high-fidelity A4 PDFs.
- **PDF-Parse**: Extracts text from user-uploaded PDF resumes.
- **Zod & Zod-to-Json-Schema**: Strong validation and typing for structured JSON output from Gemini.


```mermaid
flowchart TD
   subgraph Frontend["Frontend: React + Vite"]
        A["User Input: Resume PDF + Job Description + Self-Description"] --> B["Dashboard / History Page"]
        B --> C["Tailored PDF Download"]
    end

     subgraph Backend["Backend: Express Node.js"]
        D["Auth Middleware / JWT Verification"] --> E["PDF-Parse: Extract Resume Text"]
        E --> F["Gemini API: Structured JSON Gen"]
        E --> G["Gemini API: HTML Resume Gen"]
        G --> H["Puppeteer: HTML to A4 PDF"]
    end

    subgraph Database["Database: MongoDB"]
        I[("User Collection")]
        J[("InterviewReport Collection")]
        K[("Token Blacklist")]
    end
  A -->|POST /api/interview| D
    F -->|Store Report| J
    J -->|Fetch Reports| B
    H -->|Download Stream| C
---

## 📁 Repository Structure

```text
Hirelytics/
├── Backend/
│   ├── src/
│   │   ├── config/          # Database connection
│   │   │   └── database.js
│   │   ├── controllers/     # Controllers for Auth & Interviews
│   │   ├── middlewares/     # JWT Auth & Multer upload handling
│   │   ├── models/          # Mongoose Schemas (User, InterviewReport, Blacklist)
│   │   ├── routes/          # Express API route endpoints
│   │   ├── services/        # AI Service (Gemini API & Puppeteer PDF)
│   │   └── app.js           # Express app setup (cors, cookie-parser, routing)
│   ├── server.js            # Entry point for the server
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── features/
    │   │   ├── auth/        # Login, Signup, AuthContext, Auth Services
    │   │   └── interview/   # Dashboard, Report Display, PDF Services
    │   ├── style/           # Global SCSS stylesheets
    │   ├── App.jsx          # Route declarations
    │   └── main.jsx         # App bootstrapping
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🔌 API Reference

### **Authentication Routes (`/api/auth`)**
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/register` | Public | Registers a new user |
| `POST` | `/login` | Public | Authenticates credentials, sets JWT in cookie |
| `GET` | `/logout` | Public | Clears JWT cookie, blacklists the token |
| `GET` | `/get-me` | Private | Retrieves currently authenticated user's details |

### **Interview & Resume Routes (`/api/interview`)**
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/` | Private | Generates a new interview report from uploaded resume (PDF), self-description, and job description |
| `GET` | `/report/:interviewId` | Private | Retrieves a specific interview report by its ID |
| `GET` | `/` | Private | Lists all generated interview reports for the authenticated user |
| `POST` | `/resume/pdf/:interviewReportId` | Private | Tailors and generates a printable resume PDF |

---

## 🚀 Setup & Installation

### **Prerequisites**
- Node.js (v18+ recommended)
- MongoDB instance (Local or Atlas)
- Google Gemini API Key

### **1. Configure the Backend**
1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `Backend/` folder with the following variables:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_GENAI_API_KEY=your_gemini_api_key
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server should run on [http://localhost:3000](http://localhost:3000).*

### **2. Configure the Frontend**
1. Navigate to the Frontend directory:
   ```bash
   cd ../Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend should run on [http://localhost:5173](http://localhost:5173).*

---

## 📝 License
Distributed under the ISC License. See `Backend/package.json` for details.

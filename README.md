# Onnmed Appointment Management System

This project is a full-stack web application built as part of the NNMED Practical Test. It implements an **Appointment Management System** with distinct user roles (Admin, Doctor, Patient) and functionalities such as user authentication, appointment scheduling, and management. The application is designed with a clean, user-friendly interface and a robust backend to handle RESTful API operations.

## Users

  Admin:  `name`: "admin",
          `email`: "admin@gmail.com",
          `password`: "Admin@123",
          `userType`: "admin"

  Patient:`name`: "patient",
          `email`: "patient@gmail.com",
          `password`: "Patient@123",
          `userType`: "patient"
          
  Doctor:`name`: "doctor",
          `email`: "doctor@gmail.com",
          `password`: "Doctor@123", s
          `userType`: "doctor"
          
## Tech Stack

### Backend
- **Node.js**: Runtime environment for executing JavaScript server-side.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB (with Mongoose)**: NoSQL database for storing user and appointment data.
- **Dependencies**:
  - `bcrypt`: For password hashing and secure authentication.
  - `cors`: To enable Cross-Origin Resource Sharing.
  - `dotenv`: For environment variable management.
  - `jsonwebtoken`: For generating and verifying JWT tokens for authentication.
  - `mongoose`: For MongoDB object modeling.
  - `validator`: For input validation (e.g., email format).

### Frontend
- **Next.js (14.2.28)**: React framework for server-side rendering and static site generation.
- **React (18)**: For building dynamic UI components.
- **Tailwind CSS**: For styling and responsive design.
- **Key Libraries**:
  - `next-intl`: For internationalization and multi-language support.
  - `@fullcalendar/*`: For interactive calendar and appointment scheduling UI.
  - `@tanstack/react-query`: For efficient data fetching and state management.
  - `react-hook-form` & `@hookform/resolvers` with `zod`: For form handling and validation.
  - `react-google-recaptcha-v3`: For CAPTCHA authentication during registration and login.
  - `next-auth`: For authentication integration.
  - `lucide-react` & `react-icons`: For icons to enhance UI.
  - `sonner`: For toast notifications.
  - `@shadcn-ui/*`: For accessible and customizable UI components.
  - `date-fns`: For date manipulation and formatting.

## Project Setup Procedure

### Prerequisites
- **Node.js**: Version 18.x or higher.
- **MongoDB**: A running MongoDB instance (local or cloud, e.g., MongoDB Atlas).
- **Google reCAPTCHA v3**: API keys for CAPTCHA integration.

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Shamsmedhat/onnmed-backend.git
   cd onnmed-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   RECAPTCHA_SECRET_KEY=6LekYxsrAAAAAKqFiADlayNp62lwk8ATK0clQ8Qi
   JWT_SECRET=62f211ee13a58df188dd0ff6972ff39843ed6f9991d4a352a7f9560171c59648
   ```
4. Start the backend server:
   ```bash
   nodemon
   ```
   The API will be available at `https://onnmed-backend.vercel.app/api/appointments`.

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Shamsmedhat/onnmed.git
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Create a `.env.local` file in the root directory and add:
   ```env
   NEXT_PUBLIC_API=https://onnmed-backend.vercel.app
   NEXTAUTH_SECRET="f1yECmDh9IUagthENos1wwMhjZ5cf3rlubC/+gDHrNo="
   NEXTAUTH_URL=http://localhost:3001
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LekYxsrAAAAAIPJY78vZ3cw_Bmqt7PKuqrLpcZE
   ```
4. Run the development server:
   ```bash
   yarn dev
   ```
   The frontend will be available at `https://onnmed.vercel.app`.

## Project Approach

### What I Did

- **Backend**: Built a RESTful API using Express.js with MongoDB for data persistence. Implemented user authentication with JWT and bcrypt for secure password hashing. Added form validation using the `validator` package and CAPTCHA verification for login/register routes. Structured the codebase with separate routers for Admin, Doctor, Patient, and Appointment modules.
- **Frontend**: Used Next.js for a fast, SEO-friendly application. Integrated FullCalendar for a visual appointment scheduler. Implemented responsive forms with `react-hook-form` and `zod` for validation. Added toast notifications for user feedback and a polished UI with Tailwind CSS and Radix UI components. Used `next-intl` for initial setup of internationalization, though full multi-language support is pending.
- **Features**:
  - **Patient**: Register/login with CAPTCHA, view appointments, and book one appointment per time slot.
  - **Doctor**: Login with CAPTCHA, view appointments, and update appointment statuses.
  - **Admin**: Manage users (Doctors and Patients) and appointments via a dashboard.
  - **Appointment**: Time-slot-based scheduling (e.g., 1:00 PM, 2:00 PM) with conflict prevention.

### What I Liked

- Using Next.js with Tailwind CSS made the frontend development fast and enjoyable, especially for responsive design.
- FullCalendar was a great choice for visualizing appointments, making the UI intuitive.
- MongoDB’s flexibility allowed quick schema design for users and appointments.
- Setting up `next-intl` provided a solid foundation for future multi-language support.

### Challenges Faced

- **CAPTCHA Integration**: Configuring `react-google-recaptcha-v3` with Next.js required extra effort due to SSR compatibility issues. Resolved by using dynamic imports.
- **Time Slot Logic**: Ensuring one appointment per time slot required careful validation on both frontend and backend to prevent race conditions.
- **Time Constraint**: The 48-hour deadline was tight, but I prioritized core functionalities and a clean codebase.
- **Internationalization**: Implementing `next-intl` was straightforward, but completing full multi-language support was challenging due to time limitations.

### What’s Pending

- **Testing**: Unit tests for API endpoints and frontend components are not implemented due to time constraints.
- **Advanced Admin Features**: Features like bulk appointment management or analytics dashboards could enhance the admin module.
- **Localization**: The app is in English only; full multi-language support via `next-intl` is incomplete.
- **Deployment**: The app is not hosted yet, but deployment instructions are provided above.

## Submission

- **Repository**: GitHub Repository Link (replace with your actual public repo link).
- **Hosted App**: Not hosted yet, but can be run locally with the provided setup instructions.

Thank you for reviewing my submission! I enjoyed building this project and look forward to your feedback.

Video Demo: https://youtu.be/afQfTlcIP0I
---

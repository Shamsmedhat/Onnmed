# OnnMed Appointment Management System

This project is a full-stack web application built as part of the NNMED Practical Test. It implements an **Appointment Management System** with distinct user roles (Admin, Doctor, Patient) and functionalities such as user authentication, appointment scheduling, and management. The application is designed with a clean, user-friendly interface and a robust backend to handle RESTful API operations.

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
- **Key Libraries** (from `package.json`):
  - `@fullcalendar/*`: For interactive calendar and appointment scheduling UI.
  - `@tanstack/react-query`: For efficient data fetching and state management.
  - `react-hook-form` & `@hookform/resolvers` with `zod`: For form handling and validation.
  - `react-google-recaptcha-v3`: For CAPTCHA authentication during registration and login.
  - `next-auth`: For authentication integration.
  - `lucide-react` & `react-icons`: For icons to enhance UI.
  - `sonner`: For toast notifications.
  - `@radix-ui/*`: For accessible and customizable UI components.
  - `date-fns`: For date manipulation and formatting.

## Project Setup Procedure

### Prerequisites
- **Node.js**: Version 18.x or higher.
- **MongoDB**: A running MongoDB instance (local or cloud, e.g., MongoDB Atlas).
- **Google reCAPTCHA v3**: API keys for CAPTCHA integration.

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd onnmed-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   The API will be available at `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd onnmed
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and add:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<your-recaptcha-site-key>
   RECAPTCHA_SECRET_KEY=<your-recaptcha-secret-key>
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`.

### Deployment Notes
- **Backend**: Can be deployed on platforms like Render or Heroku. Ensure the MongoDB URI and environment variables are configured in the hosting platform.
- **Frontend**: Deploy on Vercel for optimal Next.js support. Update the API URL in `.env.local` to point to the deployed backend.

## Project Approach

### What I Did
- **Backend**: Built a RESTful API using Express.js with MongoDB for data persistence. Implemented user authentication with JWT and bcrypt for secure password hashing. Added form validation using the `validator` package and CAPTCHA verification for login/register routes. Structured the codebase with separate routers for Admin, Doctor, Patient, and Appointment modules.
- **Frontend**: Used Next.js for a fast, SEO-friendly application. Integrated FullCalendar for a visual appointment scheduler. Implemented responsive forms with `react-hook-form` and `zod` for validation. Added toast notifications for user feedback and a polished UI with Tailwind CSS and Radix UI components.
- **Features**:
  - **Patient**: Register/login with CAPTCHA, view appointments, and book one appointment per time slot.
  - **Doctor**: Login with CAPTCHA, view appointments, and update appointment statuses.
  - **Admin**: Manage users (Doctors and Patients) and appointments via a dashboard.
  - **Appointment**: Time-slot-based scheduling (e.g., 1:00 PM, 2:00 PM) with conflict prevention.

### What I Liked
- Using Next.js with Tailwind CSS made the frontend development fast and enjoyable, especially for responsive design.
- FullCalendar was a great choice for visualizing appointments, making the UI intuitive.
- MongoDB’s flexibility allowed quick schema design for users and appointments.

### Challenges Faced
- **CAPTCHA Integration**: Configuring `react-google-recaptcha-v3` with Next.js required extra effort due to SSR compatibility issues. Resolved by using dynamic imports.
- **Time Slot Logic**: Ensuring one appointment per time slot required careful validation on both frontend and backend to prevent race conditions.
- **Time Constraint**: The 48-hour deadline was tight, but I prioritized core functionalities and a clean codebase.

### What’s Pending
- **Testing**: Unit tests for API endpoints and frontend components are not implemented due to time constraints.
- **Advanced Admin Features**: Features like bulk appointment management or analytics dashboards could enhance the admin module.
- **Localization**: The app is in English only; adding multi-language support via `next-intl` is incomplete.
- **Deployment**: The app is not hosted yet, but deployment instructions are provided above.

## Submission
- **Repository**: [GitHub Repository Link](#) (replace with your actual public repo link).
- **Hosted App**: Not hosted yet, but can be run locally with the provided setup instructions.

Thank you for reviewing my submission! I enjoyed building this project and look forward to your feedback.

---

Built with 💻 by [Your Name]

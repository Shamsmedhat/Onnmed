type Appointments = {
  _id: string;
  appointmentDate: string; // ISO string format
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  captchaResponse?: string;
  email: string;
  name: string;
  phone: string;
  userType: "admin" | "doctor" | "patient";
  __v: number;
  doctor: string;
  patient: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  timeSlot: string;
};

type Appointment = {
  _id: string;
  appointmentDate: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    userType: "admin" | "doctor" | "patient";
    createdAt: string;
    updatedAt: string;
    captchaResponse?: string;
    __v: number;
  };
  doctor: {
    _id: string;
    name: string;
    email: string;
  };
  patient: {
    _id: string;
    name: string;
    email: string;
  };
  status: "pending" | "confirmed" | "cancelled" | "completed";
  timeSlot: string;
  __v: number;
};

type AppointmentsFields = {
  patient?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  email?: string;
  doctor: string;
  createdBy?: string;
  appointmentDate: string;
  timeSlot: string;
};

type GuestAppointment = {
  appointment: {
    appointmentDate: string;
    createdAt: string;
    createdBy: string;
    doctor: string;
    email: string;
    status: string;
    timeSlot: string;
    updatedAt: string;
    __v: number;
    _id: string;
  };
  message: string;
  ok: boolean;
  status: number;
};

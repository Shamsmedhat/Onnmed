declare type DatabaseFields = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

declare type Metadata = {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  limit: number;
};

declare type SuccessfulResponse<T> = {
  message: string;
} & T;

declare type ErrorResponse = {
  error: string;
};

declare type LoginSuccessResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: "male" | "female";
    userType: "admin" | "doctor" | "patient";
    token: string;
  };
};
declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;

declare type Users = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  gender: "male" | "female";
  userType: "admin" | "doctor" | "patient";
};

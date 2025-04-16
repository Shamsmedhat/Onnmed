import { FaClock } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";

export function allStatusOptions() {
  const statusOptions = [
    {
      label: "pending",
      icon: <FaClock size={18} className="text-yellow-600" />,
    },
    {
      label: "confirmed",
      icon: <IoIosCheckmarkCircle size={20} className="text-green-500" />,
    },
    {
      label: "cancelled",
      icon: <MdCancel size={20} className="text-red-500" />,
    },
    {
      label: "completed",
      icon: <GrCompliance size={20} className="text-sky-500" />,
    },
  ];

  return statusOptions;
}

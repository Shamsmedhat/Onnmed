import Image from "next/image";
import logo from "@/../public/assets/images/logo.png";

export default function Logo() {
  return (
    <Image
      alt="Onnmed – Experts in clinical research and medical publishing in the UAE, offering end-to-end support from study design to high-impact journal publication, bridging research, innovation, and patient-centric care."
      src={logo}
      height={0}
      width={120}
    />
  );
}

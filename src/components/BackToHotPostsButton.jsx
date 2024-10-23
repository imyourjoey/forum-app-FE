import { useNavigate } from "react-router-dom";
import IconArrowLeft from "../icons/IconArrowLeft";

function BackButton() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="flex items-center cursor-pointer text-gray-500 hover:text-gray-950 mb-1 w-fit"
        onClick={() => navigate("/hot")}
      >
        <IconArrowLeft />
        <p className="ms-0.5">Back</p>
      </div>
    </>
  );
}

export default BackButton;

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function NavigationPill() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center mb-4 md:mb-0">
        <div className="join">
          <button
            className={`btn btn-sm join-item ${
              Cookies.get("currentPage") === "/hot" ? "btn-active" : ""
            }`}
            onClick={() => navigate("/hot")}
          >
            Top Posts
          </button>
          <button
            className={`btn btn-sm join-item ${
              Cookies.get("currentPage") === "/feed" ? "btn-active" : ""
            }`}
            onClick={() => navigate("/feed")}
          >
            New Posts
          </button>
        </div>
      </div>
    </>
  );
}

export default NavigationPill;

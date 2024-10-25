import NavBar from "../../components/Navbar";
import Authentication from "../Authentication/Index";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      navigate("/hot");
    }
  }, []);

  return (
    <div>
      <NavBar />

      <Authentication />
    </div>
  );
}

export default Landing;

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function SideNav() {
  const navigate = useNavigate();
  const userId = Cookies.get("currentUser");
  return (
    <>
      <div className="text-3xl font-bold">
        <li onClick={() => navigate("/leaderboard")}>
          <a>Leaderboard</a>
        </li>
        <li onClick={() => navigate("/feed")}>
          <a>New Posts</a>
        </li>
        <li onClick={() => navigate("/hot")}>
          <a>Top Posts</a>
        </li>
        <li onClick={() => navigate(`/user-posts/${userId}`)}>
          <a>My Posts</a>
        </li>
      </div>
      <div className="divider mt-auto !mb-1"></div>
      <li className="text-sm">
        <a>Creator's Note</a>
      </li>
      {/* <li className="text-sm">
        <a>Buy me a coffee</a>
      </li> */}
    </>
  );
}

export default SideNav;

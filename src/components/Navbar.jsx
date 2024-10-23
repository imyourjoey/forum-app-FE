import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../api/mutations";

function NavBar() {
  const navigate = useNavigate();
  const currentUsername = Cookies.get("currentUsername");
  const currentUser = Cookies.get("currentUser");

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      if (data.errors) {
        alert("Error Logging Out");
      } else {
        Cookies.remove("authToken");
        Cookies.remove("currentUser");
        Cookies.remove("currentUsername");
        Cookies.remove("currentPage");
        Cookies.remove("previousPage");
        navigate("/");
      }
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  return (
    <>
      <div className="navbar bg-primary">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl ogg">Resonate</a>
        </div>
        {currentUsername && (
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost text-xl ogg"
              >
                {currentUsername}
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li onClick={() => navigate(`/user-posts/${currentUser}`)}>
                  <a>My Posts</a>
                </li>
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default NavBar;

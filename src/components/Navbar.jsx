import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../api/mutations";
import SideNav from "./SideNav";

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
      <div className="drawer">
        <div className="navbar bg-primary drawer-content">
          <div className="flex-1">
            {currentUser ? (
              <label
                htmlFor="my-drawer"
                className="btn btn-ghost drawer-button text-2xl"
              >
                ums conf.
              </label>
            ) : (
              <div className="text-2xl ps-4 font-semibold">ums confessions</div>
            )}
          </div>
          {currentUsername && (
            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost text-2xl font-semibold"
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

        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle btn btn-ghost text-xl ogg"
        />

        <div className="drawer-side z-50	">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <SideNav />
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavBar;

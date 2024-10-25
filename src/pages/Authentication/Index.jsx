import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Cookies from "js-cookie";

function Authentication() {
  const authToken = Cookies.get("authToken");
  return (
    <div className="flex flex-col items-center mt-6">
      <div className="mb-6">
        a truly{" "}
        <span className="ogg font-semibold text-3xl md:text-4xl">
          Anonymous
        </span>{" "}
        online forum
      </div>
      <div className="w-12/12 md:w-[600px]">
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab !w-[100px]"
            aria-label="Sign In"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6 "
          >
            <SignIn />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab !w-[100px]"
            aria-label="Sign Up"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <SignUp />
          </div>
        </div>
      </div>

      <div className="mt-2 text-gray-500 text-xs text-center px-10 mt">
        UMS Confessions is an unofficial site and is not affiliated with
        Universiti Malaysia Sabah in any way.
      </div>
    </div>
  );
}

export default Authentication;

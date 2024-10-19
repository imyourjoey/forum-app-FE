import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Authentication() {
  return (
    <div className="flex justify-center mt-4">
      <div className="w-11/12 md:w-[600px]">
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Sign In"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <SignIn />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Sign Up"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;

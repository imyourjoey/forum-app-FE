import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Authentication() {
  return (
    <div className="flex flex-col items-center mt-6">
      <div className="mb-6">
        a truly <span className="ogg font-semibold text-4xl">Anonymous</span>{" "}
        online forum
      </div>
      <div className="w-11/12 md:w-[600px]">
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

      <div className="mt-3 text-gray-500 text-xs">
        "Created for the People, by the People"
      </div>

      <div className="mt-0.5 text-gray-500 text-xs">
        UMS Confessions is an unofficial site and is not affiliated with
        Universiti Malaysia Sabah in any way.
      </div>
    </div>
  );
}

export default Authentication;

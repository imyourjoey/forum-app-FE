import IconPassword from "../../icons/IconPassword";
import IconUsername from "../../icons/IconUsername";

function SignUp() {
  return (
    <div className="h-[450px] flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold mb-3">Create a New Account</div>
        {/* Username Input */}
        <label className="form-control w-full">
          <div className="label px-0">
            <span className="label-text">Username</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <IconUsername />
            <input
              type="text"
              className="grow"
              placeholder="Enter Your Username"
            />
          </label>
          <div className="px-0 label">
            <span className="label-text-alt hidden">Bottom Left label</span>
          </div>
        </label>

        {/* Password Input */}
        <label className="form-control w-full">
          <div className="label px-0">
            <span className="label-text">Password</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <IconPassword />
            <input
              type="password"
              className="grow"
              placeholder="Enter Your Password"
            />
          </label>
          <div className="px-0 label">
            <span className="label-text-alt hidden">Bottom Left label</span>
          </div>
        </label>

        <label className="form-control w-full">
          <div className="label px-0">
            <span className="label-text">Confirm Password</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <IconPassword />
            <input
              type="password"
              className="grow"
              placeholder="Confirm Your Password"
            />
          </label>
          <div className="px-0 label">
            <span className="label-text-alt hidden">Bottom Left label</span>
          </div>
        </label>
      </div>

      <button className="btn btn-primary btn-block">Sign Up</button>
    </div>
  );
}

export default SignUp;

import IconPassword from "../../icons/IconPassword";
import IconUsername from "../../icons/IconUsername";

function SignIn() {
  return (
    <div className="h-[400px] flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold mb-3">Sign In to Your Account</div>
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
      </div>

      <button className="btn btn-primary btn-block">Sign In</button>
    </div>
  );
}

export default SignIn;

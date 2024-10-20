import { useState } from "react";
import IconPassword from "../../icons/IconPassword";
import IconUsername from "../../icons/IconUsername";
import { signInUser } from "../../api/mutations";
import { useMutation } from "@tanstack/react-query";

function SignIn() {
  const [error, setError] = useState({});
  const [alert, setAlert] = useState({});
  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
  });

  const handleUsernameChange = (e) => {
    setFormInput({
      ...formInput,
      username: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setFormInput({
      ...formInput,
      password: e.target.value,
    });
  };

  const isFormValid =
    formInput.username &&
    formInput.username.trim() !== "" &&
    formInput.password &&
    formInput.password.trim() !== "";

  const mutation = useMutation({
    mutationFn: signInUser,
    onSuccess: (data) => {
      if (data.errors) {
        setError(data.errors);
      } else {
        setError({});
        setAlert({
          show: true,
          message: "Logged In Successfully",
        });

        setTimeout(() => {
          setAlert({ show: false, message: "" });
        }, 3000);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      mutation.mutate(formInput);
    }
  };

  return (
    <form className="flex flex-col justify-between" onSubmit={handleSubmit}>
      <div>
        <div className="text-2xl font-bold mb-3">Sign In to Your Account</div>
        {/* <div>{JSON.stringify(formInput)}</div> */}
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
              onChange={handleUsernameChange}
              value={formInput.username}
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
              onChange={handlePasswordChange}
              value={formInput.password}
            />
          </label>
          <div className="px-0 label">
            {error.name && (
              <span className="label-text-alt text-red-500">
                {error.name[0]}
              </span>
            )}
          </div>
        </label>
      </div>

      <button
        className="btn btn-primary btn-block mt-12"
        disabled={!isFormValid}
      >
        Sign In
      </button>

      {alert.show && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info bg-secondary shadow-md">
            <span>{alert.message}</span>
          </div>
        </div>
      )}
    </form>
  );
}

export default SignIn;

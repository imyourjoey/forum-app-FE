import { useState } from "react";
import IconPassword from "../../icons/IconPassword";
import IconUsername from "../../icons/IconUsername";
import { signUpUser } from "../../api/mutations";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

function SignUp() {
  const [error, setError] = useState({});
  const [alert, setAlert] = useState({});
  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const hasCreatedUser = Cookies.get("hasCreatedUser") === "true";

  const handleUsernameChange = (e) => {
    // Sanitize username input
    const sanitizedUsername = e.target.value
      .replace(/[^a-z0-9\-]/g, "") // Remove all characters except lowercase letters, numbers, and dashes
      .replace(/\s+/g, "") // Remove all whitespace
      .toLowerCase(); // Convert to lowercase

    setFormInput({
      ...formInput,
      username: sanitizedUsername,
    });
  };

  const handlePasswordChange = (e) => {
    setFormInput({
      ...formInput,
      password: e.target.value,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setFormInput({
      ...formInput,
      confirmPassword: e.target.value,
    });
  };

  const isFormValid =
    formInput.username &&
    formInput.username.trim() !== "" &&
    formInput.password &&
    formInput.password.trim() !== "" &&
    formInput.confirmPassword &&
    formInput.confirmPassword.trim() !== "";

  const mutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      if (data.errors) {
        setError(data.errors);
      } else {
        setError({});
        setAlert({
          show: true,
          message: "User created successfully. Sign in now!",
        });

        setFormInput({
          username: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          setAlert({ show: false, message: "" });
        }, 3000);

        setTimeout(() => {
          Cookies.set("hasCreatedUser", "true", { expires: 365 });
        }, 10000);
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
        <div className="text-2xl font-bold mb-3">Create a New Account</div>
        {hasCreatedUser && formInput.username && (
          <div className="mb-3 text-red-500">
            Looks like you've signed up using this device. No need to sign up
            twice!
          </div>
        )}
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
              value={formInput.username}
              onChange={handleUsernameChange}
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
              value={formInput.password}
              onChange={handlePasswordChange}
            />
          </label>
          <div className="px-0 label">
            {error.password && (
              <span className="label-text-alt text-red-500">
                {error.password[0]}
              </span>
            )}
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
              value={formInput.confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </label>
        </label>
      </div>

      <button
        className="btn btn-primary btn-block mt-12"
        disabled={!isFormValid || hasCreatedUser}
      >
        Sign Up
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

export default SignUp;

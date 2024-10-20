import { useState } from "react";
import IconPassword from "../../icons/IconPassword";
import IconUsername from "../../icons/IconUsername";
import { signUpUser } from "../../api/mutations";
import { useMutation } from "@tanstack/react-query";

function SignUp() {
  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
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
      // Handle success, e.g., redirect or show a message
      console.log("User signed up successfully:", data);
    },
    onError: (error) => {
      // Handle error
      console.error("Error signing up:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      mutation.mutate(formInput);
    }
  };

  return (
    <form
      className="h-[450px] flex flex-col justify-between"
      onSubmit={handleSubmit}
    >
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
              value={formInput.username}
              onChange={handleUsernameChange}
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
              value={formInput.password}
              onChange={handlePasswordChange}
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
              value={formInput.confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </label>
          <div className="px-0 label">
            <span className="label-text-alt hidden">Bottom Left label</span>
          </div>
        </label>
      </div>

      <button className="btn btn-primary btn-block" disabled={!isFormValid}>
        Sign Up
      </button>
    </form>
  );
}

export default SignUp;

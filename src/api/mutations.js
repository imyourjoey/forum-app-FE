// ---------- SIGN UP ----------
export const signUpUser = async (formData) => {
  const formattedData = {
    name: formData.username,
    password: formData.password,
    password_confirmation: formData.confirmPassword,
  };

  const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formattedData),
  });

  return response.json();
};

// ---------- SIGN IN ----------
export const signInUser = async (formData) => {
  const formattedData = {
    name: formData.username,
    password: formData.password,
  };

  const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formattedData),
  });

  return response.json();
};

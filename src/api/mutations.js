// src/api/mutations.js

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

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

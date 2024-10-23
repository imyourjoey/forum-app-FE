import Cookies from "js-cookie";

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

// ---------- LOG OUT ----------
export const logoutUser = async () => {
  const token = Cookies.get("authToken");
  console.log(token);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(formattedData),
  });

  return response.json();
};

// ---------- GET POSTS ----------
export const getPosts = async (currentPage) => {
  const token = Cookies.get("authToken");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?page=${currentPage}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};

// ---------- CREATE POSTS ----------
export const createPosts = async (postData) => {
  const token = Cookies.get("authToken");

  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });

  return response.json();
};

// ---------- GET POSTS ----------
export const getComments = async (postId) => {
  const token = Cookies.get("authToken");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};

// ---------- CREATE COMMENT ----------
export const createComment = async (replyData) => {
  const token = Cookies.get("authToken");

  const response = await fetch(`${import.meta.env.VITE_API_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(replyData),
  });

  return response.json();
};

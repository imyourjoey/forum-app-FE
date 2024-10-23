import { Route, Routes } from "react-router-dom";
import Joey from "./pages/Joey";
import Landing from "./pages/Landing/Index";
import NotFound from "./pages/NotFound/Index";
import Feed from "./pages/Feed/Index";
import ProtectedRoute from "./pages/ProtectedRoute";
import Post from "./pages/Post/Index";
import HotPosts from "./pages/HotPosts/Index";
import MyPosts from "./pages/MyPosts/Index";
import UserPosts from "./pages/UserPosts/Index";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Retrieve the current path from the location
    const currentPath = location.pathname;

    // Retrieve the previous path from cookies
    const previousPath = Cookies.get("currentPage");

    // Store the current page in a cookie as previous page
    if (previousPath !== currentPath) {
      // Update the previous page to the current page if it's different
      Cookies.set("previousPage", previousPath);
    }

    // Store the current page in a cookie
    Cookies.set("currentPage", currentPath);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/joey" element={<Joey />} />
        <Route path="/feed" element={<ProtectedRoute element={<Feed />} />} />
        <Route
          path="/hot"
          element={<ProtectedRoute element={<HotPosts />} />}
        />
        <Route
          path="/my-posts"
          element={<ProtectedRoute element={<MyPosts />} />}
        />

        <Route path="*" element={<NotFound />} />
        <Route
          path="/post/:postId"
          element={<ProtectedRoute element={<Post />} />}
        />
        <Route
          path="/user-posts/:userId"
          element={<ProtectedRoute element={<UserPosts />} />}
        />
      </Routes>
    </>
  );
}

export default App;

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

function App() {
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

import { Route, Routes } from "react-router-dom";
import Joey from "./pages/Joey";
import Landing from "./pages/Landing/Index";
import NotFound from "./pages/NotFound/Index";
import Feed from "./pages/Feed/Index";
import ProtectedRoute from "./pages/ProtectedRoute";
import Post from "./pages/Post/Index";
import HotPosts from "./pages/HotPosts/Index";

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

        <Route path="*" element={<NotFound />} />
        <Route
          path="/post/:postId"
          element={<ProtectedRoute element={<Post />} />}
        />
      </Routes>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Joey from "./pages/Joey";
import Landing from "./pages/Landing/Index";
import NotFound from "./pages/NotFound/Index";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/joey" element={<Joey />} />
        <Route path="*" element={<NotFound />} /> {/* Handle 404 */}
      </Routes>
    </>
  );
}

export default App;

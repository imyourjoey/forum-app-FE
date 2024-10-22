import { useParams } from "react-router-dom";
import NavBar from "../../components/Navbar";
function Post() {
  const { postId } = useParams();

  return (
    <>
      <NavBar />
      <div className="center-container"> this is post view</div>
    </>
  );
}

export default Post;

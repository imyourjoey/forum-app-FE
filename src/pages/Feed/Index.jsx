import NavBar from "../../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/mutations";
import FeedItem from "./FeedItem";

function Feed() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <>
      <NavBar />

      <div className="center-container">
        {isLoading ? (
          <div className="mt-3">Loading...</div>
        ) : (
          posts.map((post) => (
            <>
              <FeedItem post={post} />
            </>
          ))
        )}
      </div>
    </>
  );
}

export default Feed;

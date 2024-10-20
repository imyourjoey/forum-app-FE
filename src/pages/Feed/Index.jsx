import NavBar from "../../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/mutations";

function Feed() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <>
      <NavBar />

      <div className="center-container">
        {isLoading ? <div>loading</div> : posts[0].title}

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="text-gray-500 flex">
              <div>Joey77</div> <div className="mx-1.5">•</div>
              <div> 7 months ago</div>
            </div>
            <div className="text-3xl font-semibold my-2">
              Free Speech Allowed
            </div>

            <div className="text-gray-500 flex">
              <div>300 reactions</div> <div className="mx-1.5">•</div>
              <div> 400 comments</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feed;

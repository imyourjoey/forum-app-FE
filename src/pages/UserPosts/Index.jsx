import NavBar from "../../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getMyPosts } from "../../api/mutations";
import FeedItem from "../Feed/FeedItem";
import { useState } from "react";
import Pagination from "../../components/PaginationButtons";
import CreatePostModal from "../Post/CreatePostModal";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function UserPosts() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => getMyPosts(userId, currentPage),
    keepPreviousData: true,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    refetch();
  };

  const closeModal = () => {
    document.getElementById("my_modal_2").close();
  };

  const handleFeedItemClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <>
      <NavBar />

      <div className="center-container !py-6">
        {isLoading ? (
          <div className="mt-3">Loading...</div>
        ) : (
          <>
            <div className="text-4xl font-semibold mb-6">My Posts</div>

            {posts.data.map((post) => (
              <FeedItem
                key={post.id}
                post={post}
                onClick={() => handleFeedItemClick(post.id)}
              />
            ))}
            <Pagination
              currentPage={currentPage}
              totalPages={posts.last_page}
              onPageChange={handlePageChange}
            />
            <dialog
              id="my_modal_2"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <CreatePostModal onClose={closeModal} refetchPosts={refetch} />
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </>
        )}
      </div>
    </>
  );
}

export default UserPosts;

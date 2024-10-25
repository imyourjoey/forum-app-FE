import NavBar from "../../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getMyPosts } from "../../api/mutations";
import FeedItem from "../Feed/FeedItem";
import { useState } from "react";
import Pagination from "../../components/PaginationButtons";
import CreatePostModal from "../Post/CreatePostModal";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Index";
import BackToHotPostsButton from "../../components/BackToHotPostsButton";
import Cookies from "js-cookie";
import IllusNothingHere from "../../assets/Illustrations/IllusNothingHere";

function UserPosts() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: postData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-posts", currentPage],
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

  if (isLoading) {
    return (
      <>
        <NavBar />
        <Loading />
      </>
    );
  }

  return (
    <>
      <NavBar />
      {postData.user ? (
        <div className="center-container !py-6">
          <BackToHotPostsButton />
          <div className="text-4xl font-bold truncate">
            {postData.user.name || Cookies.get("currentUsername")}'s Posts
          </div>
          <div className="text-lg mt-2 mb-6">
            {postData.posts.total} post{postData.posts.total === 1 ? "" : "s"}{" "}
            in total
          </div>

          {postData.posts.data.map((post) => (
            <FeedItem
              key={post.id}
              post={post}
              onClick={() => handleFeedItemClick(post.id)}
            />
          ))}

          <Pagination
            currentPage={postData.posts.current_page}
            totalPages={postData.posts.last_page}
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
              <button>Close</button>
            </form>
          </dialog>
        </div>
      ) : (
        <div
          className="center-container
        "
        >
          <div className="mt-6 flex justify-center -translate-x-2">
            <IllusNothingHere />
          </div>
          <div className="mt-1 text-2xl font-semibold text-center">Whoops!</div>
          <div className="text-center mt-1">
            This user hasn't posted anything yet
          </div>

          <div className="flex justify-center">
            <button
              className="btn btn-primary mt-4"
              onClick={() => navigate("/feed")}
            >
              Back to New Posts
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default UserPosts;

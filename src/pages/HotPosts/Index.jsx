import NavBar from "../../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getHotPosts } from "../../api/mutations";
import FeedItem from "../Feed/FeedItem";
import { useState } from "react";
import Pagination from "../../components/PaginationButtons";
import CreatePostModal from "../Post/CreatePostModal";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Index";
import NavigationPill from "../../components/NavigationPill";
import IllusNothingHereSmall from "../../assets/Illustrations/IllusNothingHereSmall";

function HotPosts() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => getHotPosts(currentPage),
    keepPreviousData: true,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    refetch();
  };

  const openModal = () => {
    document.getElementById("my_modal_2").showModal();
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

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="center-container !py-6">
            <NavigationPill />
            <div className="text-4xl font-bold mb-2">Top Posts 🔥</div>
            <div className="md:flex justify-between mb-6 text-xl items-center">
              <div>What's on your mind today?</div>
              <button
                className="btn btn-neutral btn-sm mt-2 md:mt-0"
                onClick={openModal}
              >
                + New Post
              </button>
            </div>
            {posts.data.map((post) => (
              <FeedItem
                key={post.id}
                post={post}
                onClick={() => handleFeedItemClick(post.id)}
              />
            ))}
            {posts.data.length === 0 ? (
              <div className="flex flex-col items-center border-t-2 border-b-2 py-10">
                <IllusNothingHereSmall />
                <div className="text-lg font-bold -mt-10 ogg tracking-wider">
                  Nothing Here...
                </div>
              </div>
            ) : (
              <Pagination
                currentPage={currentPage}
                totalPages={posts.last_page}
                onPageChange={handlePageChange}
              />
            )}
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
          </div>
        </>
      )}
    </>
  );
}

export default HotPosts;

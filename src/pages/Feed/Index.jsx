import NavBar from "../../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/mutations";
import FeedItem from "./FeedItem";
import { useState } from "react";
import Pagination from "../../components/PaginationButtons";
import CreatePostModal from "../Post/CreatePostModal";

function Feed() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => getPosts(currentPage),
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

  return (
    <>
      <NavBar />

      <div className="center-container !py-6">
        {isLoading ? (
          <div className="mt-3">Loading...</div>
        ) : (
          <>
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
              <FeedItem key={post.id} post={post} />
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

export default Feed;

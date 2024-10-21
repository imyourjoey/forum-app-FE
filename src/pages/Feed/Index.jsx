import NavBar from "../../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/mutations";
import FeedItem from "./FeedItem";
import { useState } from "react";
import Pagination from "../../components/PaginationButtons";

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

  return (
    <>
      <NavBar />

      <div className="center-container">
        {isLoading ? (
          <div className="mt-3">Loading...</div>
        ) : (
          <>
            {posts.data.map((post) => (
              <FeedItem key={post.id} post={post} />
            ))}
            <Pagination
              currentPage={currentPage}
              totalPages={posts.last_page}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Feed;

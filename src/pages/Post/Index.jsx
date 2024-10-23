import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react"; // Import useState
import NavBar from "../../components/Navbar";
import { getComments } from "../../api/mutations"; // Import the getComments function
import { formatDistanceToNowStrict } from "date-fns";
import CreateCommentModal from "../Comment/CreateCommentModal";

// Recursive component to render comments and their replies with toggle
const Comment = ({ comment, onReply }) => {
  const [showReplies, setShowReplies] = useState(false); // Track if replies are visible

  return (
    <div className="ps-6 border-l border-gray-300 pb-2">
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-secondary bg-gray-100 md:max-w-96 min-w-48">
          <div className="flex flex-wrap justify-start items-center text-gray-500">
            <p>{comment.user.name}</p>
            <p className="mx-1"> • </p>
            <p>{formatDistanceToNowStrict(new Date(comment.created_at))} ago</p>
          </div>
          <div className="my-2">
            <p className="text-gray-700 whitespace-pre-line">
              {comment.content}
            </p>
          </div>

          <div className="flex flex-wrap">
            <div
              className="text-blue-500 underline cursor-pointer text-sm me-2"
              onClick={() => onReply(comment)}
            >
              Reply
            </div>
            {comment.replies.length > 0 && (
              <div
                className="text-blue-500 underline cursor-pointer text-sm"
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies
                  ? `Hide ${comment.replies.length} repl${
                      comment.replies.length === 1 ? "y" : "ies"
                    }`
                  : `Show ${comment.replies.length} repl${
                      comment.replies.length === 1 ? "y" : "ies"
                    }`}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Render replies only if showReplies is true */}
      {showReplies && (
        <div className="mt-4">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
};

function Post() {
  const { postId } = useParams();
  const [selectedComment, setSelectedComment] = useState(null); // Track the comment for replying

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div className="center-container mt-3">Loading post...</div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <NavBar />
        <div className="center-container mt-3">
          Error loading post: {error.message}
        </div>
      </>
    );
  }

  const { post, comments } = data; // Destructure the response data

  const handleReply = (comment) => {
    setSelectedComment(comment); // Set the selected comment for replying
    document.getElementById("createCommentModal").showModal(); // Open the modal
  };

  const closeModal = () => {
    setSelectedComment(null); // Clear the selected comment
    document.getElementById("createCommentModal").close();
  };
  function renderContentWithLinks(text) {
    // Updated regex to detect URLs with or without protocol
    const urlRegex =
      /(?:(?:https?:\/\/|ftp:\/\/|www\.|ftp\.)([^\s]+)|([a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})?)([^\s]*)?)/g;

    // Split text into parts and replace URLs with anchor tags
    const parts = text.split(urlRegex).map((part, index) => {
      if (urlRegex.test(part)) {
        // Determine if the part is a full URL or just a domain
        const isFullUrl =
          part.startsWith("http://") ||
          part.startsWith("https://") ||
          part.startsWith("ftp://");
        const formattedUrl = isFullUrl ? part : `http://${part}`; // Prepend with "http://"

        return (
          <a
            key={index}
            href={formattedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });

    return parts;
  }

  return (
    <>
      <NavBar />
      <div className="center-container">
        <div className="my-6">
          <div>
            <div className="flex mb-3">
              <p className=" text-gray-500">Posted by {post.user.name}</p>
              <p className="text-gray-500 mx-1">•</p>
              <p className="text-gray-500">
                {formatDistanceToNowStrict(new Date(post.created_at))} ago
              </p>
            </div>
            <h2 className="text-2xl md:text-4xl font-semibold mb-3">
              {post.title}
            </h2>
            <p className="text-lg mb-5 whitespace-pre-line">
              {renderContentWithLinks(post.body)}
            </p>
          </div>

          {/* Likes and Dislikes */}
          <div className="flex gap-1">
            <button className="btn btn-xs">👍 {post.likes}</button>
            <button className="btn btn-xs">👎 {post.dislikes}</button>
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-2">Comments</h3>

        <div className="card border-r">
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            <div className="space-y-6 mb-4">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onReply={handleReply}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Comment Modal */}
      <dialog
        id="createCommentModal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          {selectedComment && (
            <CreateCommentModal
              comment={selectedComment}
              post={post}
              onClose={closeModal}
              refetch={refetch}
            />
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
}

export default Post;

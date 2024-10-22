import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react"; // Import useState
import NavBar from "../../components/Navbar";
import { getComments } from "../../api/mutations"; // Import the getComments function
import { formatDistanceToNowStrict } from "date-fns";

// Recursive component to render comments and their replies with toggle
const Comment = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false); // Track if replies are visible

  return (
    <div className="ps-6 border-l border-gray-300 pb-2">
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-secondary bg-gray-100 md:max-w-96 min-w-48">
          <div className="flex flex-wrap justify-start items-center">
            <p>{comment.user.name}</p>
            <p className="text-gray-500 ms-1.5">
              • {formatDistanceToNowStrict(new Date(comment.created_at))} ago •
            </p>
          </div>
          <div className="my-2">
            <p className="text-gray-700">{comment.content}</p>
          </div>

          <div className="flex flex-wrap">
            <div className="text-blue-500 underline cursor-pointer text-sm me-2">
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
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

function Post() {
  const { postId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
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

  return (
    <>
      <NavBar />
      <div className="center-container">
        <div className="card mb-6">
          <div className="my-6">
            <h2 className="text-2xl md:text-4xl font-semibold">{post.title}</h2>
            <p className="text-lg mt-3">{post.body}</p>
          </div>

          <div className="flex">
            <p className=" text-gray-500">Posted by {post.user.name} </p>
            <p className="text-gray-500 ms-1.5 ">
              • {formatDistanceToNowStrict(new Date(post.created_at))} ago •
            </p>
          </div>

          {/* Likes and Dislikes */}
          <div className="mt-2 flex gap-1">
            <button className="btn btn-xs">👍 {post.likes}</button>
            <button className="btn btn-xs">👎 {post.dislikes}</button>
          </div>
        </div>

        <h3 className="text-xl font-semibold">Comments</h3>

        <div className="card border-r">
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            <div className="space-y-6 mb-4">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Post;

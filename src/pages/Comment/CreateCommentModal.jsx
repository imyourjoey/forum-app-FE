import { useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { createComment } from "../../api/mutations";

function CreateCommentModal({ comment, post, onClose, refetch }) {
  const [replyContent, setReplyContent] = useState(""); // State to track reply input

  const handleInputChange = (e) => {
    setReplyContent(e.target.value); // Update reply content as user types
  };

  const handleReplySubmit = () => {
    if (replyContent.trim() === "") return; // Safety check

    const replyData = {
      post_id: post.post_id,
      parent_id: comment.id,
      content: replyContent,
    };

    mutation.mutate(replyData);
  };

  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {
      if (data.errors) {
        alert("Error Submitting Reply. Try Again Later!");
      } else {
        alert("Comment Successfully Submitted!");
        setReplyContent("");
        onClose();
        refetch();
      }
    },
  });

  return (
    <>
      <div>
        <div className="text-2xl font-semibold mb-3">Reply to this comment</div>

        <div className="chat chat-start">
          <div className="chat-bubble chat-bubble-secondary bg-gray-100 md:max-w-96 min-w-48">
            <div className="flex flex-wrap justify-start items-center">
              <p>{comment.user.name}</p>
              <p className="mx-1"> • </p>
              <p className="text-gray-500">
                {formatDistanceToNowStrict(new Date(comment.created_at))} ago
              </p>
            </div>
            <div className="my-2">
              <p className="text-gray-700">{comment.content}</p>
            </div>
          </div>
        </div>

        {/* Reply Input and Submit Button */}
        <div className="join flex mt-4">
          <input
            className="input input-sm input-bordered join-item w-10/12"
            placeholder="Enter Your Reply"
            value={replyContent} // Bind input value to state
            onChange={handleInputChange} // Update state on input change
          />
          <button
            className="btn btn-primary join-item w-2/12 btn-sm"
            onClick={handleReplySubmit} // Trigger reply submit on click
            disabled={replyContent.trim() === ""} // Disable button if input is empty
          >
            Reply
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateCommentModal;

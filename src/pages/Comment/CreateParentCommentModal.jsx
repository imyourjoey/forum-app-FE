import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createComment } from "../../api/mutations";

function CreateParentCommentModal({ post, onClose, refetch }) {
  const [replyContent, setReplyContent] = useState(""); // State to track reply input

  const handleInputChange = (e) => {
    setReplyContent(e.target.value); // Update reply content as user types
  };

  const handleReplySubmit = () => {
    if (replyContent.trim() === "") return; // Safety check

    const replyData = {
      post_id: post.post_id,
      content: replyContent,
    };

    mutation.mutate(replyData);
  };

  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {
      if (data.errors) {
        alert("Error Submitting Comment. Try Again Later!");
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
        <div className="text-2xl font-semibold">Add New Comment</div>
        {/* Reply Input and Submit Button */}
        <div className="join flex mt-4">
          <input
            className="input input-sm input-bordered join-item w-10/12"
            placeholder="Enter Your Comment"
            value={replyContent} // Bind input value to state
            onChange={handleInputChange} // Update state on input change
          />
          <button
            className="btn btn-primary join-item w-2/12 btn-sm"
            onClick={handleReplySubmit} // Trigger reply submit on click
            disabled={replyContent.trim() === ""} // Disable button if input is empty
          >
            Comment
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateParentCommentModal;

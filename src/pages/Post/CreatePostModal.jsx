import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createPosts } from "../../api/mutations";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function CreatePostModal({ onClose, refetchPosts }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [textBody, setTextBody] = useState("");

  const handleTitleChange = (e) => {
    if (e.target.value.length <= 255) {
      setTitle(e.target.value);
    }
  };

  const handleTextBodyChange = (e) => {
    if (e.target.value.length <= 10000) {
      setTextBody(e.target.value);
    }
  };

  const isSubmitDisabled = title.trim() === "" || textBody.trim() === "";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example submission logic
    const postData = {
      title: title.trim(),
      body: textBody.trim(),
    };

    mutation.mutate(postData);
  };

  const mutation = useMutation({
    mutationFn: createPosts,
    onSuccess: (data) => {
      if (data.errors) {
        alert("Error Submitting Post, Try Again Later!");
      } else {
        setTitle("");
        setTextBody("");
        navigate("/feed");
        onClose(); // Close the modal
        if (Cookies.get("currentPage") === "/feed") {
          refetchPosts(); // Refetch posts
        }
      }
    },
  });

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="text-2xl font-semibold">Create New Post</div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              type="text"
              placeholder="Enter Your Title"
              className="input input-bordered w-full"
              value={title}
              onChange={handleTitleChange}
            />
            <div className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt">{title.length}/255</span>
            </div>
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Text Body</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Enter Text Body"
              value={textBody}
              onChange={handleTextBodyChange}
            ></textarea>
            <div className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt">{textBody.length}/10000</span>
            </div>
          </label>

          <button
            type="submit"
            className="btn btn-primary btn-block mt-4"
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default CreatePostModal;

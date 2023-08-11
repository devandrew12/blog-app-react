import axios from "../../Api/axios";
import React, { useState, useContext } from "react";

import AuthContext from "../../Context/AuthProvider";

const EditComment = ({ commentId, initialContent, onCommentEdited }) => {
  const { auth } = useContext(AuthContext);
  const [content, setContent] = useState(initialContent);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `/comment/${commentId}`,
        {
          comment: {
            content: content,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      onCommentEdited(response.data.comment);
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h2 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Edit Comment
        </h2>

        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              type="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add a comment..."
              required=""
            />
          </div>
          <button
            type="submit"
            disabled={!content}
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Edit comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditComment;

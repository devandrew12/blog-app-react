import React, { useState, useEffect, useContext } from "react";
import axios from "../../Api/axios";
import AuthContext from "../../Context/AuthProvider";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { auth } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setData] = useState(null);
  const { post_id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${post_id}`);
        setTitle(response.data?.post?.title);
        setBody(response.data?.post?.body);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [auth.token, post_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      post: {
        title: title,
        body: body,
      },
    };

    try {
      const date = await axios.patch(`/posts/${post_id}/edit`, postData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const data = date.data.post;
      setData(data);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h2 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Edit Post
        </h2>

        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
              required=""
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="body"
            >
              Body
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="body"
              type="body"
              value={body}
              placeholder=" Enter comment..."
              onChange={(e) => setBody(e.target.value)}
              required=""
            />
          </div>
          <button
            type="submit"
            disabled={!title || !body}
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Edit Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;

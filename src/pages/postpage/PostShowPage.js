// PostShowPage.js
import React, { useState, useEffect } from "react";
import axios from "../../Api/axios";
import { Link, useParams } from "react-router-dom";

function PostShowPage(props) {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const response = await axios.get(`/posts/${id}`);
      setPost(response?.data?.post);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  return (
    <div>
      {post ? (
        <div className="max-w-2xl content-center rounded overflow-hidden shadow-lg mx-auto text-center">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              <h2>
                {post.id}
                {post.title}
              </h2>
            </div>
            <p className="text-gray-700 text-base">{post.body}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              <p>Comment Count: {post.comment_count}</p>
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              <p>User: {post.user.display_name}</p>
            </span>
            <span className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              <Link className="btn btn-blue" to={`/posts/${post.id}/comments`}>
                Show Comments
              </Link>
            </span>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PostShowPage;

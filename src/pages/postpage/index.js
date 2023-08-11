import React, { useState, useEffect, useContext } from "react";
import axios from "../../Api/axios";
import "./post.css";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthProvider";

function PostsPage() {
  const { auth } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const PER_PAGE = 30;

  useEffect(() => {
    getPosts();
  }, [page]);

  const getPosts = async () => {
    try {
      const response = await axios.get(`/posts?page=${page}`);
      setPosts(response?.data?.posts);
      setTotalPages(
        response?.data?.meta?.total_entries
          ? Math.ceil(response?.data?.meta?.total_entries / PER_PAGE)
          : 0
      );
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      // Update the posts list after successful deletion
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const renderPagination = () => {
    const items = [];

    if (page > 1) {
      items.push(
        <span
          key="prev"
          onClick={() => selectPageHandler(page - 1)}
          className="pagination__prev-next"
        >
          &lt;
        </span>
      );
    }

    for (let i = 1; i <= Math.min(totalPages, 3); i++) {
      items.push(
        <span
          key={i}
          className={page === i ? "pagination__selected" : ""}
          onClick={() => selectPageHandler(i)}
        >
          {i}
        </span>
      );
    }

    if (totalPages > 3) {
      items.push(<span key="ellipsis1">...</span>);
    }

    for (let i = totalPages - 2; i <= totalPages; i++) {
      if (i > 3) {
        items.push(
          <span
            key={i}
            className={page === i ? "pagination__selected" : ""}
            onClick={() => selectPageHandler(i)}
          >
            {i}
          </span>
        );
      }
    }

    if (page < totalPages) {
      items.push(
        <span
          key="next"
          onClick={() => selectPageHandler(page + 1)}
          className="pagination__prev-next"
        >
          &gt;
        </span>
      );
    }

    return items;
  };

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div>
      <h5 className="mx-auto text-center font-bold text-2xl mb-12">
        All Posts
      </h5>
      <div>
        <span className="flex justify-start">
          <Link to="/createposts">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Post
            </button>
          </Link>
        </span>
      </div>
      {posts.map((post) => (
        <div key={post.id}>
          <div className="max-w-2xl content-center rounded overflow-hidden shadow-lg mx-auto text-center">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                <h2>
                  {post.id} - {post.title}
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
              <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                <Link className="btn btn-blue" to={`/posts/${post.id}`}>
                  Show Post
                </Link>
              </span>
              <span className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                <Link className="btn btn-blue" to={`/posts/${post.id}/edit`}>
                  Edit Post
                </Link>
              </span>
              <span className="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                <button
                  className="btn btn-red"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete Post
                </button>
              </span>
            </div>
          </div>
        </div>
      ))}
      {totalPages > 0 && <div className="pagination">{renderPagination()}</div>}
    </div>
  );
}

export default PostsPage;

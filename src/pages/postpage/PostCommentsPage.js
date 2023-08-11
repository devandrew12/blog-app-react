import axios from "../../Api/axios";
import React, { useState, useEffect, useContext } from "react";

import "./post.css";

import AuthContext from "../../Context/AuthProvider";
import CreateComments from "../../components/comments/createComment";
import EditComment from "../../components/comments/editComment";

const PostCommentsPage = ({ id }) => {
  const { auth } = useContext(AuthContext);
  const [postComments, setPostComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [editCommentId, setEditCommentId] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const PER_PAGE = 30;

  useEffect(() => {
    getPostComments();
  }, [page]);

  const getPostComments = async () => {
    try {
      const response = await axios.get(`/posts/${id}/comments?page=${page}`);
      setPostComments(response?.data?.comments);
      setTotalPages(
        response?.data?.meta?.total_entries
          ? Math.ceil(response?.data?.meta?.total_entries / PER_PAGE)
          : 0
      );
    } catch (error) {
      console.error("Error fetching postComments:", error);
    }
  };

  const renderPagination = () => {
    const items = [];

    // Add "Previous" button if not on the first page
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

    // Add first 3 page numbers
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

    // Add "..." if necessary
    if (totalPages > 3) {
      items.push(<span key="ellipsis1">...</span>);
    }

    // Add last 3 page numbers
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

    // Add "Next" button if not on the last page
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

  const handleCommentAdded = (newComment) => {
    setPostComments((prevComments) => [...prevComments, newComment]);
    setShowCommentForm(false); // Hide the CommentForm after adding a comment
  };

  const handleCommentEdited = (editedComment) => {
    setPostComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === editedComment.id ? editedComment : comment
      )
    );
  };

  const handleCommentDeleted = async (commentId) => {
    try {
      await axios.delete(`/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      setPostComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowCommentForm(true)}
        >
          Add Comment
        </button>
        <span className="flex justify-start">
          {showCommentForm && (
            <CreateComments postId={id} onCommentAdded={handleCommentAdded} />
          )}
        </span>
      </div>
      {postComments.map((postComment) => (
        <div key={postComment.id}>
          <div className="max-w-2xl content-center rounded overflow-hidden shadow-lg mx-auto text-center">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                <h2>
                  {postComment.id}
                  {postComment.title}
                </h2>
              </div>
              <p className="text-gray-700 text-base">{postComment.body}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                <p>Comment Count: {postComment.comment_count}</p>
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                <p>User: {postComment.user.display_name}</p>
              </span>
              <button
                className="bg-blue-500 hover:bg-blue-700 inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                onClick={() => setEditCommentId(postComment.id)}
              >
                Edit Comment
              </button>
              {editCommentId === postComment.id && (
                <EditComment
                  commentId={postComment.id}
                  initialContent={postComment.content}
                  onCommentEdited={handleCommentEdited}
                />
              )}
              <button
                className="bg-red-500 hover:bg-red-700 inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                onClick={() => handleCommentDeleted(postComment.id)}
              >
                Delete Comment
              </button>
            </div>
          </div>
        </div>
      ))}
      {totalPages > 0 && <div className="pagination">{renderPagination()}</div>}
    </div>
  );
};

export default PostCommentsPage;

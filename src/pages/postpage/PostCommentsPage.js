import React, { useState, useEffect } from "react";
import axios from "../../Api/axios";
import "./post.css";
import { Link, useParams } from "react-router-dom";

const PostCommentsPage = () => {
  const [postComments, setPostComments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { id } = useParams();

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

  return (
    <div>
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
              {/* <span className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                <Link className="btn btn-blue" to={`/postComments/${postComments.id}`}>
                  Show
                </Link>
              </span> */}
            </div>
          </div>
        </div>
      ))}
      {totalPages > 0 && <div className="pagination">{renderPagination()}</div>}
    </div>
  );
}

export default PostCommentsPage;

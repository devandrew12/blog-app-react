import React, { useState, useEffect } from "react";
import axios from "../../Api/axios";
import ReactPaginate from "react-paginate";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await axios.get(`/posts`);
      setPosts(response?.data?.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // const handlePageClick = (selectedPage) => {
  //   setOffset(selectedPage * perPage); // Fixed offset calculation
  // };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>Comment Count: {post.comment_count}</p>
          <p>User: {post.user.display_name}</p>
        </div>
      ))}
      {/* <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => handlePageClick(selected)}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      /> */}
    </div>
  );
}

export default PostsPage;

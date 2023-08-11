import React from "react";
import { Route, Routes } from "react-router-dom";

import CreatePost from "./components/post/createPost";
import LoginForm from "./components/loginform";
import PostCommentsPage from "./pages/postpage/PostCommentsPage";
import PostPage from "./pages/postpage";
import PostShowPage from "./pages/postpage/PostShowPage";
import Register from "./components/register";
import Navbar from "./components/navbar";
import Logout from "./components/logout";
import EditPost from "./components/post/editPost";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/posts/:id" element={<PostShowPage />} />
        <Route path="/posts/:id/comments" element={<PostCommentsPage />} />
        <Route path="/createposts" element={<CreatePost />} />
        <Route path="/posts/:post_id/edit" element={<EditPost />} />

        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default App;

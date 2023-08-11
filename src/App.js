import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PostPage from "./pages/postpage";
import Register from "./components/register";
import LoginForm from "./components/loginform";
import PostShowPage from "./pages/postpage/PostShowPage";
import PostCommentsPage from "./pages/postpage/PostCommentsPage";
import Navbar from "./components/navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* <Route
          path="/"
          element={isLoggedIn ? <PostPage /> : <Navigate to={"/login"} />}
        /> */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/posts/:id" element={<PostShowPage />} />
        <Route path="/posts/:id/comments" element={<PostCommentsPage />} />
      </Routes>
    </div>
  );
};

export default App;

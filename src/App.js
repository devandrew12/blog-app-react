import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginForm from "./components/loginform";
import PostCommentsPage from "./pages/postpage/PostCommentsPage";
import PostPage from "./pages/postpage";
import PostShowPage from "./pages/postpage/PostShowPage";
import Register from "./components/register";
import Navbar from "./components/navbar";

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
      </Routes>
    </div>
  );
};

export default App;

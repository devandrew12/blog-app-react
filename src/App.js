import React, { useState } from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import PostPage from "./pages/postpage";
import Register from "./components/register";
import Logout from "./components/logout";
import LoginForm from "./components/loginform";
import PostShowPage from "./pages/postpage/PostShowPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h1>React Authentication Example</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/">Post</Link>
              </li>
              <li>
                <Logout onLogout={handleLogout} />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <br />
              <li>
                <Link to="/register">Create Account</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <PostPage /> : <Navigate to={"/login"} />}
        />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<PostPage/>} />
        <Route path="/posts/:id" element={<PostShowPage />} />
        <Route path="/posts/:id/comments" element={<PostShowPage />} />  
        {/* <Route path="/post">
          {isLoggedIn ? <PostPage /> : <LoginForm onLogin={handleLogin} />}
        </Route> */}
      </Routes>
    </div>
  );
};

export default App;

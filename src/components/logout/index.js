import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../Context/AuthProvider";
const Logout = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      handleLogout();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    setAuth({
      email: "",
      password: "",
      token: "",
      login: false,
    });

    navigate("/");
  };

  return (
    <div className="block text-gray-700 text-md font-bold mt-2 ml-5">
      <h2>Logout...</h2>
    </div>
  );
};

export default Logout;

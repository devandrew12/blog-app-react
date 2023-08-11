import { useEffect, useRef, useState } from "react";
import axios from "../../Api/axios";

const REGISTER_URL = "/users";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, displayName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email", email);
    console.log("password", password);
    console.log("displayName", displayName);
    try {
      console.log("REGISTER_URL", REGISTER_URL);
      const response = await axios.post(REGISTER_URL, {
        display_name: displayName,
        email: email,
        password: password,
      });
      console.log(JSON.stringify(response?.data));
      setSuccess(true);
      setEmail("");
      setPassword("");
      setDisplayName("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email Taken");
      } else {
        console.log("Error: ", err.response);
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="/login">Login In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Create Account</h1>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              //   onFocus={() => setEmailFocus(true)}
              //   onBlur={() => setEmailFocus(false)}
            />
            <br />
            <br />
            <label>Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <br />
            <br />
            <label>Name:</label>
            <input
              type="text"
              id="display_name"
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
              required
            />
            <br />
            <br />
            <button
              disabled={!email || !password || !displayName ? true : false}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              <a href="/register">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;

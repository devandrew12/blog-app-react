import { useEffect, useRef, useState } from "react";
import axios from "../../Api/axios";
import { Link } from "react-router-dom";

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
    try {
      await axios.post(REGISTER_URL, {
        user: {
          display_name: displayName,
          email: email,
          password: password,
        },
      });
      setSuccess(true);
      setEmail("");
      setPassword("");
      setDisplayName("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409 || err.response?.status === 422) {
        setErrMsg("Email is already Taken");
      } else {
        setErrMsg(err.response)
        console.log("Error: ", err.response);
      }
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/">Login In</Link>
          </p>
        </section>
      ) : (
        <section>
          <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <Link
                to="/login"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
              >
                Blog app
              </Link>
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create and account
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        ref={userRef}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter email"
                        required=""
                      />
                    </div>
                    {errMsg && (
                      <p
                        className={`${
                          errMsg ? "text-red-500 block mx-auto " : "offscreen"
                        }  text-sm font-medium`}
                        aria-live="assertive"
                      >
                        {errMsg}
                      </p>
                    )}
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Enter password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="display_name"
                        onChange={(e) => setDisplayName(e.target.value)}
                        value={displayName}
                        placeholder="Enter display name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={
                        !email || !password || !displayName ? true : false
                      }
                      className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Create an account
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account?
                      <Link
                        to="/"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Login here
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default Register;

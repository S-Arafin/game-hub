import React, { use, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import ErrorPage from "../Components/Shared/ErrorPage";
import { FaGoogle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [error, setError] = useState("");
  const { signIn, signInWithGoogle, resetPassword } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef()

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        setError(errorCode);
        toast.error(error.message);
      });
  };
  const handleGoogleSignin = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
        toast.error(error.message);
      });
  };
  const handleReset = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }
    resetPassword(email)
      .then(() => {
        toast.success("Password reset email sent. Check your inbox.");
        setError("");
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
        toast.error(error.message);
      });
  };
  return (
    <div>
      <div className="hero bg-base-200 py-30">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-center p-7">
              Login to your Account
            </h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <fieldset className="fieldset">
                {/* email */}
                <label className="label">Email</label>
                <input
                  required
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                  ref={emailRef}
                />

                {/* password */}
                <label className="label">Password</label>
                <input
                  required
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <div>
                  <a onClick={handleReset} className="link link-hover">Forgot password?</a>
                </div>

                {error && <p className="text-accent">{error}</p>}

                <button type="submit" className="btn btn-neutral mt-4">
                  Login
                </button>
                <button
                  onClick={handleGoogleSignin}
                  className="btn btn-accent mt-4"
                >
                  Continue With
                  <FaGoogle className="" />
                </button>
                <div className="py-3">
                  <p className="text-center">
                    Don't have an account{" "}
                    <Link
                      className="text-secondary font-semibold text-center"
                      to={"/auth/register"}
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;

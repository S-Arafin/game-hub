import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {

  const navigate = useNavigate()

  const {createUser, setUser, updateUser} = use(AuthContext)
  const [nameError , setNameError] = useState('')
  const [passwordError , setPasswordError] = useState('')
  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  const num = /[0-9]/
  const specialChar = /[^A-Za-z0-9]/;

  const [emailError , setEmailError] = useState('')
  const handleRegister = (e) => {
    
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    if(name.length < 5 ){
      setNameError("Name should be at-least 5 character ")
    }
    const photo = form.photo.value;
    const email = form.email.value;
    if(!email.includes("@")){
      setEmailError("Please Provide a valid email")
    }
    const password = form.password.value;

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }
    if (!lowerCase.test(password)) {
      setPasswordError("Password must contain a lowercase letter");
      return;
    }
    if (!upperCase.test(password)) {
      setPasswordError("Password must contain an uppercase letter");
      return;
    }
    if (!num.test(password)) {
      setPasswordError("Password must contain a number");
      return;
    }
    if (!specialChar.test(password)) {
      setPasswordError("Password must contain a special character");
      return;
    }
    
    

    createUser(email,password).then(result=>{
      const user = result.user
      updateUser({displayName:name, photoURL:photo}).then(()=>{
        setUser({...user, displayName:name, photoURL:photo})
        navigate("/")
      })
      .catch((error)=>{
        <Error error= {error}></Error>
        setUser(user)
        navigate("/")
      })
      
    })
    .catch((error) => {
    const errorMessage = error.message;
    toast.error(errorMessage)
  });
  };

  return (
    <div>
      <div className="hero bg-base-200 py-15">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-center p-7">Register</h1>
            <p>Register to get all the best games at the lowest price.</p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleRegister} className="card-body">
              <fieldset className="fieldset">
                {/* name */}
                <label className="label">Name</label>
                <input
                  required
                  name="name"
                  type="text"
                  className="input"
                  placeholder="Name"
                />
                {
                  nameError && <p className="text-accent text-xs text-error">{nameError}</p>
                }
                {/* photoUrl */}
                <label className="label">Photo Url</label>
                <input
                  required
                  name="photo"
                  type="text"
                  className="input"
                  placeholder="Photo Url"
                />
                {/* email */}
                <label className="label">Email</label>
                <input
                  required
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                {
                  emailError && <p className="text-accent text-xs text-error">{emailError}</p>
                }
                {/* pass */}
                <label className="label">Password</label>
                <input
                  required
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                {
                  passwordError && <p className="text-accent text-xs text-error">{passwordError}</p>
                }

                <button type="submit" className="btn btn-neutral mt-4">
                  Register
                </button>
                <div className="py-3">
                  <p className="text-center">
                    Already have an account please{" "}
                    <Link
                      className="text-secondary font-semibold text-center"
                      to={"/auth/login"}
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

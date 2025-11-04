import React, { use, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { AiTwotoneEdit } from "react-icons/ai";
import Loader from "../Components/Shared/Loader";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router";

const Profile = () => {
  const { user, updateUser } = use(AuthContext);
  const [click, setClick] = useState(false);
  const [hide, setHide] = useState("hidden");
  const handleClick = () => {
    if (click === false) {
      setClick(true);
      setHide("block");
    } else {
      setClick(false);
      setHide("hidden");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;

    const updatedData = {
      displayName: name || user.displayName,
      photoURL: photo || user.photoURL,
    };

    if (
      updatedData.displayName === user.displayName &&
      updatedData.photoURL === user.photoURL
    ) {
      toast.error("You didn't updated any information");
      setClick(false);
      setHide("hidden");
      return;
    }

    updateUser(updatedData)
      .then(() => {
        setClick(false);
        setHide("hidden");
        form.reset();
      })
      .catch((error) => {
        toast.error(error, "Unable to update profile please try again");
      });
  };

  if (!user) return <Loader></Loader>;

  return (
    <div className="max-w-[1000px] mx-auto px-20 py-16   md:h-[44rem] flex flex-col md:flex-row items-center md:relative">
      <ToastContainer className={"absolute z-50"} />
      <div className="flex flex-col md:flex-row items-center gap-10">
        <img className="max-w-[15rem] rounded-xl" src={user.photoURL} alt="" />
        <div className="flex flex-col gap-7">
          <p className="text-lg font-semibold">Name : {user.displayName}</p>
          <p className="text-lg font-semibold">Email : {user.email}</p>
          <p className="text-lg font-semibold">Photo URL : {user.photoURL}</p>
          <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
            <button
              onClick={handleClick}
              className="btn btn-outline btn-secondary text-lg w-full md:w-[13rem]"
            >
              Update Profile <AiTwotoneEdit />
            </button>
            <Link to={'/'} className="btn btn-outline btn-secondary text-lg w-full md:w-[13rem]">
                Home
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${hide} bg-base-300/70 mt-5 pt-5 mx-auto md:py-20 h-[20rem] md:absolute w-full md:w-[60rem] md:left-6`}
      >
        <div className="min-h-[25rem] ">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form onSubmit={handleSubmit} className="card-body">
                <fieldset className="fieldset">
                  {/* name */}
                  <label className="label">Update Name</label>
                  <input
                    name="name"
                    type="text"
                    className="input"
                    placeholder="Provide a name"
                  />
                  {/* photo url */}
                  <label className="label">Photo URL</label>
                  <input
                    name="photo"
                    type="text"
                    className="input"
                    placeholder="Photo URL"
                  />

                  <button type="submit" className="btn btn-secondary mt-4">
                    Submit
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
      <button></button>
    </div>
  );
};

export default Profile;

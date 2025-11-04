import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Newsletter = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    
   

    toast.success("Thanks for subscribing!");
    e.target.reset();
  };

  return (
    <>
      <div className="bg-base-200 py-16 sm:py-24 max-w-[70vw] mx-auto rounded-2xl my-10">

        <div className="hero-content text-center max-w-2xl mx-auto">
          <div className="w-full">
            
            <h2 className="text-4xl lg:text-5xl font-bold text-primary">
              Join the <span className="">Game<span className='text-accent'>hub</span></span> Community
            </h2>
            
            <p className="py-6 text-lg text-base-content/80">
              Get the latest game reviews, news, and exclusive deals sent straight to your inbox. No spam, just games.
            </p>
            
            <div className="form-control w-full max-w-lg mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="join">
                  <input
                    type="email"
                    name="email"
                    placeholder="your-email@gamehub.com"
                    className="input input-bordered join-item w-full"
                    required
                  />
                  <button type="submit" className="btn btn-primary join-item">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default Newsletter;


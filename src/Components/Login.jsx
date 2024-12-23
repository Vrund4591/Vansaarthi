import { useState } from "react";
import Card from "./Card";
import CustomCheckbox from "./CustomCheckbox";
import Signup from "./Signup";

const Login = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div>
      {showSignup ? (
        <Signup setShowSignup={setShowSignup} />
      ) : (
        <div className='flex justify-center items-center'>
          <div className='w-[700px] p-8 bg-white'>
            <h2 className='text-2xl font-bold mb-4'></h2>
            <form>
              <div className="text-3xl font-bold my-6">Login to Your Account</div>
              <div className="my-2">Email</div>
              <div className=""><Card><input className="w-[630px] px-2 py-2" placeholder="Enter your email" type="text" /></Card></div>
              <div className="my-2">Password</div>
              <div><Card><input className="w-[630px] px-2 py-2" placeholder="Enter your password" type="text" /></Card></div>
              <div className="flex">
                <div className="py-4 px-1">
                  <CustomCheckbox label="Remeber me" checked={isChecked} onChange={setIsChecked} />
                </div>
              </div>
              <div><Card backgroundColor="bg-[#3BDE3B]" textColor="text-black"><button className="text-xl font-semibold w-[630px] py-2">Login</button></Card></div>
              <div className="text-center my-4">
                Don't have an account? 
                <span 
                  className="text-green-400 cursor-pointer ml-1"
                  onClick={() => setShowSignup(true)}
                >
                  Sign up
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

import { useState } from "react";
import Card from "./Card";
import CustomCheckbox from "./CustomCheckbox";

const Signup = ({ setShowSignup }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <div className='flex justify-center items-center'>
        <div className='w-[700px] p-8 bg-white'>
          <form>
            <div className="text-3xl font-bold my-6">Create Your Account</div>
            
            <div className="my-2">Username</div>
            <div><Card><input className="w-[630px] px-2 py-2" placeholder="Enter your username" type="text" /></Card></div>
            
            <div className="my-2">Email</div>
            <div><Card><input className="w-[630px] px-2 py-2" placeholder="Enter your email" type="email" /></Card></div>
            
            <div className="my-2">Password</div>
            <div><Card><input className="w-[630px] px-2 py-2" placeholder="Enter your password" type="password" /></Card></div>
            
            <div className="flex">
              <div className="py-4 px-1">
                <CustomCheckbox label="I agree to the terms and conditions" checked={isChecked} onChange={setIsChecked} />
              </div>
            </div>
            
            <div><Card backgroundColor="bg-[#3BDE3B]" textColor="text-black"><button className="text-xl font-semibold w-[630px] py-2">Sign Up</button></Card></div>
            
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="mx-4 text-gray-500">or</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div><Card backgroundColor="bg-white" textColor="text-black">
              <button className="text-xl font-semibold w-[630px] py-2 flex items-center justify-center">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6 mr-2"/>
                Continue with Google
              </button>
            </Card></div>
            
            <div className="text-center my-4">
              Already have an account? 
              <span 
                className="text-green-400 cursor-pointer ml-1"
                onClick={() => setShowSignup(false)}
              >
                Login
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "./Card";
import CustomCheckbox from "./CustomCheckbox";
import Signup from "./Signup";
import { generateAvatarUrl } from '../utils/avatar';  // Add this import

const Login = ({ onClose }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const loginData = {
        email: formData.email.toLowerCase().trim(),
        password: formData.password.trim()
      };

      console.log('Attempting login:', { email: loginData.email });

      const response = await fetch(`http://${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.success && data.token) {
        const userData = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          displayName: data.user.name,
          picture: data.user.picture || generateAvatarUrl(data.user.name)
        };
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(userData));
        window.location.reload();
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim() // Trim whitespace from inputs
    }));
  };

  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL ;
      window.location.href = `${apiUrl}/api/auth/google`;
    };

  return (
    <div>
      {showSignup ? (
        <Signup setShowSignup={setShowSignup} />
      ) : (
        <div className='flex justify-center items-center'>
          <div className='w-[700px] p-8 bg-white'>
            <form onSubmit={handleSubmit}>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <div className="text-3xl font-bold my-6">Login to Your Account</div>
              
              <div className="my-2">Email</div>
              <div className="">
                <Card>
                  <input 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-[630px] px-2 py-2" 
                    placeholder="Enter your email" 
                    type="email"
                    required 
                  />
                </Card>
              </div>
              
              <div className="my-2">Password</div>
              <div>
                <Card>
                  <input 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-[630px] px-2 py-2"
                    placeholder="Enter your password"
                    type="password"
                    required
                  />
                </Card>
              </div>
              
              <div className="flex">
                <div className="py-4 px-1">
                  <CustomCheckbox 
                    label="Remember me" 
                    checked={isChecked} 
                    onChange={setIsChecked} 
                  />
                </div>
              </div>
              
              <div>
                <Card backgroundColor="bg-[#3BDE3B]" textColor="text-black">
                  <button type="submit" className="text-xl font-semibold w-[630px] py-2">
                    Login
                  </button>
                </Card>
              </div>
              
              <div className="flex items-center my-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <div className="mx-4 text-gray-500">or</div>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <div>
                <Card backgroundColor="bg-white" textColor="text-black">
                  <button 
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center w-[630px] py-2"
                  >
                    <img src="/google.jpg" alt="Google" className="w-6 h-6 mr-2" />
                    <span>Continue with Google</span>
                  </button>
                </Card>
              </div>

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
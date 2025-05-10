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
    const apiUrl = import.meta.env.VITE_API_URL;
    window.location.href = `${apiUrl}/api/auth/google`;
  };

  return (
    <div className="w-full flex items-center justify-center py-4 md:py-6 lg:py-12">
      {showSignup ? (
        <Signup setShowSignup={setShowSignup} />
      ) : (
        <div className="w-full max-w-[100%] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[520px] px-3 md:px-4">
          <div className="bg-white rounded-lg ">
            <form onSubmit={handleSubmit} className="p-4 md:p-6 lg:p-10">
              {error && <div className="text-red-500 text-center mb-4 md:mb-6 text-sm md:text-base">{error}</div>}
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6 lg:mb-8">Login to Your Account</div>
              
              <div className="mb-3 md:mb-4 lg:mb-6">
                <div className="font-medium text-gray-700 mb-1 md:mb-2 text-sm md:text-base">Email</div>
                <Card>
                  <input 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 lg:py-3.5 text-sm md:text-base" 
                    placeholder="Enter your email" 
                    type="email"
                    required 
                  />
                </Card>
              </div>
              
              <div className="mb-3 md:mb-4 lg:mb-6">
                <div className="font-medium text-gray-700 mb-1 md:mb-2 text-sm md:text-base">Password</div>
                <Card>
                  <input 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 lg:py-3.5 text-sm md:text-base"
                    placeholder="Enter your password"
                    type="password"
                    required
                  />
                </Card>
              </div>
              
              <div className="flex justify-start pt-1 md:pt-2">
                <CustomCheckbox 
                  label="Remember me" 
                  checked={isChecked} 
                  onChange={setIsChecked} 
                />
              </div>
              
              <div className="pt-3 md:pt-4">
                <Card backgroundColor="bg-[#3BDE3B]" textColor="text-black">
                  <button type="submit" className="w-full text-sm md:text-lg font-semibold py-2 md:py-3 lg:py-3.5">
                    Login
                  </button>
                </Card>
              </div>

              <div className="flex items-center my-4 md:my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <div className="mx-2 md:mx-4 text-gray-500 text-sm md:text-base">or</div>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <Card backgroundColor="bg-white" textColor="text-black">
                <button 
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center w-full py-2 md:py-3 lg:py-3.5"
                >
                  <img src="/google.jpg" alt="Google" className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                  <span className="text-sm md:text-base">Continue with Google</span>
                </button>
              </Card>

              <div className="text-center pt-3 md:pt-4 text-sm md:text-base">
                <span className="text-gray-600">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => setShowSignup(true)}
                  className="text-green-500 hover:text-green-600 font-medium"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
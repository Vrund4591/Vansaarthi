import Card from './Card';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Login from './Login';
import Donate from './Donate';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserMenu } from './UserMenu';

const Navigation = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isDonateVisible, setIsDonateVisible] = useState(false);
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            setIsPopupVisible(false);
        }
    }, [isAuthenticated]);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const toggleDonatePopup = () => {
        setIsDonateVisible(!isDonateVisible);
    };
    const closeLoginPopup = () => {
        setIsPopupVisible(false);
    };
    const closeSignupPopup = () => {
        setIsSignupVisible(false);
    };

    const switchToSignup = () => {
        setIsLoginVisible(false);
        setIsSignupVisible(true);
    };

    const switchToLogin = () => {
        setIsSignupVisible(false);
        setIsLoginVisible(true);
    };

    const scrollToContact = (e) => {
        e.preventDefault();
        
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollToContact: true } });
        } else {
            const contactSection = document.getElementById('contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        if (location.state?.scrollToContact) {
            window.history.replaceState({}, document.title);
            
            setTimeout(() => {
                const contactSection = document.getElementById('contact-section');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

  return (
    <>
        <nav className='w-full bg-white border-b-4 border-black px-8'>
        <div className='flex justify-between gap-2 p-3'>
            <Link to="/" className='h-2 flex gap-2 px-9 hover:opacity-90'>
                <div className='mt-[0px] align-top'>
                    <Card backgroundColor="bg-green-400" textColor="text-white">
                        <img src="\Vansaarthi.svg" alt="Vansaarthi Logo" height={110} width={45} />
                    </Card>
                </div>
                <div className='text-3xl p-2 font-semibold kumar mt-1 text-green-700'>વનસારથી</div>
            </Link>
            <div>
                            <div className=' flex gap-2 pt-2'>
                                <Link to="/" className='py-1 px-2  hover:text-green-400'>Home</Link>
                                <Link to="/about" className='py-1 px-2 hover:text-green-400'>About</Link>
                                <Link to="/projects" className='py-1 px-2  hover:text-green-400'>Projects</Link>
                                <Link to="/volunteer" className='py-1 px-2  hover:text-green-400'>Volunteer</Link>
                                <a href='#contact-section' onClick={scrollToContact} className='py-1 px-2  hover:text-green-400'>Contact</a>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            {isAuthenticated ? (
                                <>
                                    <Card backgroundColor="bg-[#F97316]" textColor="text-black">
                                        <button onClick={toggleDonatePopup} className='py-2 px-6'>
                                            Donate
                                        </button>
                                    </Card>
                                    <UserMenu />
                                </>
                            ) : (
                                <>
                                    <Card backgroundColor="bg-[#F97316]" textColor="text-black">
                                        <button onClick={toggleDonatePopup} className='py-2 px-6'>
                                            Donate
                                        </button>
                                    </Card>
                                    <Card backgroundColor="bg-[#3BDE3B]" textColor="text-black">
                                        <button onClick={togglePopup} className='py-2 px-6'>
                                            Login
                                        </button>
                                    </Card>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Popup Overlay */}
                {isPopupVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative">
                        <Card backgroundColor="bg-white" textColor="text-black">
                            <div className="relative p-2">
                                <button 
                                    onClick={closeLoginPopup}
                                    className="absolute top-2 right-2 hover:bg-gray-100 p-1"
                                >
                                        <svg 
                                            className="w-6 h-6" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M6 18L18 6M6 6l12 12" 
                                            />
                                        </svg>
                                        </button>
                                <div className="min-w-[320px]">
                                    <Login onClose={closeLoginPopup} />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                )}

                {/* Donate Popup */}
                {isDonateVisible && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="relative p-2 w-full max-w-2xl">
                            <Donate onClose={toggleDonatePopup} />
                        </div>
                    </div>
                )}
        </>
  );
}

export default Navigation;
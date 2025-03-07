import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Card from './Card';
import { generateAvatarUrl } from '../utils/avatar';  // Add this import

export const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <Card backgroundColor="bg-[#3BDE3B]" textColor="text-black">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-4 py-2 flex items-center space-x-3 hover:bg-[#32c932] transition-colors duration-200 rounded-lg"
                    aria-label="User menu"
                >
                    {user?.picture ? (
                        <img 
                            src={user.picture} 
                            alt="Profile" 
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform duration-200"
                        />
                    ) : (
                        <img 
                            src={generateAvatarUrl(user?.name || '')} 
                            alt="Profile" 
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform duration-200"
                        />
                    )}
                    <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </Card>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 z-50 transform transition-all duration-200 ease-out origin-top-right">
                    <Card backgroundColor="bg-white" textColor="text-black">
                        <div className="divide-y divide-gray-100 shadow-lg rounded-lg overflow-hidden">
                            {/* Profile Header */}
                            <div className="p-4 bg-gradient-to-br from-green-50 to-white">
                                <div className="flex items-center space-x-4">
                                    <div className="relative group">
                                        {user?.picture ? (
                                            <img 
                                                src={user.picture} 
                                                alt="Profile" 
                                                className="w-16 h-16 rounded-full border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-200"
                                            />
                                        ) : (
                                            <img 
                                                src={generateAvatarUrl(user?.name || '')} 
                                                alt="Profile" 
                                                className="w-16 h-16 rounded-full border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-200"
                                            />
                                        )}
                                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-lg truncate">{user?.name}</div>
                                        <div className="text-sm text-gray-500 truncate">{user?.email}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Options */}
                            <div className="py-1">
                                <button
                                    onClick={() => window.location.href = '/profile'}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
                                >
                                    <img 
                                        src={user?.picture || generateAvatarUrl(user?.name || '')}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full border-2 border-gray-100"
                                    />
                                    <span>View Profile</span>
                                </button>
                                
                                <button
                                    onClick={() => window.location.href = '/settings'}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
                                >
                                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Settings</span>
                                </button>

                                <div className="border-t border-gray-100 my-2"></div>

                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        logout();
                                    }}
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-3 group"
                                >
                                    <svg className="w-8 h-8 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span className="font-medium">Logout</span>
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};
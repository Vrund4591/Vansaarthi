"use client";

import React, { useState, useEffect } from "react";
import Card from "./Card";

// You need to install lottie-react if not already installed
// npm install lottie-react

// SVG Icons and Illustrations
const LeafIcon = () => (
  <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21,4c0,0-3-1-9.5,0.75C5,6.5,1.5,8.25,1.5,8.25S1,20.5,16,21C16,21,21,4,21,4z M7,14.5 c1.3,1.3,3.6,1,5.3-0.8s2.1-4,0.8-5.3s-3.6-1-5.3,0.8S5.7,13.2,7,14.5z"/>
  </svg>
);

const PawprintIcon = () => (
  <svg className="w-10 h-10 text-amber-700" viewBox="0 0 512 512" fill="currentColor">
    <path d="M256,224c-79.4,0-192,122.8-192,200.2C64,459.5,90.5,480,125.4,480c39.4,0,47.8-24.4,75.7-24.4c28.3,0,33.9,24.4,74.5,24.4c36.1,0,61.4-21.8,61.4-55.8C337,347.7,327.6,224,256,224z M320,32c-17.6,0-32,21.6-32,48s14.4,48,32,48s32-21.6,32-48S337.6,32,320,32z M192,32c-17.6,0-32,21.6-32,48s14.4,48,32,48s32-21.6,32-48S209.6,32,192,32z M128,112c-17.6,0-32,21.6-32,48s14.4,48,32,48s32-21.6,32-48S145.6,112,128,112z M384,112c-17.6,0-32,21.6-32,48s14.4,48,32,48s32-21.6,32-48S401.6,112,384,112z"/>
  </svg>
);

const TreeIcon = () => (
  <svg className="w-16 h-16 text-green-800" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2L4,20h4v2h8v-2h4L12,2z M12,17l-1.22-2h2.44L12,17z"/>
  </svg>
);

const VolunteerIcon = () => (
  <svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-13L9 1v7.5L12 12l3-3.5V1l-3 1z"/>
  </svg>
);

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    dateOfBirth: "",
    availability: "",
    skills: "",
    interests: "",
    preferredLocation: "",
    comments: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animationsLoaded, setAnimationsLoaded] = useState(false);
  const [lottieModule, setLottieModule] = useState(null);
  const [animationData, setAnimationData] = useState({
    leaf: null,
    jungle: null,
    trees: null,
    volunteer: null
  });

  // Load Lottie and animations when component mounts
  useEffect(() => {
    const loadDependencies = async () => {
      try {
        // Dynamic import of Lottie
        const lottieReact = await import('lottie-react').catch(() => null);
        setLottieModule(lottieReact);

        // Try to load animation data
        try {
          const leafModule = await import('../assets/leaf-animation.json');
          setAnimationData(prev => ({ ...prev, leaf: leafModule.default || leafModule }));
        } catch (e) {
          console.warn("Could not load leaf animation", e);
        }

        try {
          const jungleModule = await import('../assets/jungle-animation.json');
          setAnimationData(prev => ({ ...prev, jungle: jungleModule.default || jungleModule }));
        } catch (e) {
          console.warn("Could not load jungle animation", e);
        }

        try {
          const treesModule = await import('../assets/trees-animation.json');
          setAnimationData(prev => ({ ...prev, trees: treesModule.default || treesModule }));
        } catch (e) {
          console.warn("Could not load trees animation", e);
        }

        try {
          const volunteerModule = await import('../assets/volunteer-animation.json');
          setAnimationData(prev => ({ ...prev, volunteer: volunteerModule.default || volunteerModule }));
        } catch (e) {
          console.warn("Could not load volunteer animation", e);
        }

        setAnimationsLoaded(true);
      } catch (error) {
        console.error("Failed to load dependencies:", error);
      }
    };
    
    loadDependencies();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };    

  const validateForm = () => {
    if (!formData.firstName.trim()) return "First name is required";
    if (!formData.lastName.trim()) return "Last name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Invalid email format";
    if (!formData.phone.trim()) return "Phone number is required";
    if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) return "Invalid phone number";
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/volunteers/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      alert('Thank you for registering as a volunteer! We will contact you soon.');
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        dateOfBirth: "",
        availability: "",
        skills: "",
        interests: "",
        preferredLocation: "",
        comments: "",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden" 
         style={{
           backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 200 200\'%3E%3Cdefs%3E%3Cpattern id=\'leafPattern\' patternUnits=\'userSpaceOnUse\' width=\'80\' height=\'80\'%3E%3Cpath fill=\'%23a3e635\' fill-opacity=\'0.15\' d=\'M30,20 Q42,25 45,40 T60,60 T80,45 T85,30 T70,10 T45,15 T30,20\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23leafPattern)\'/%3E%3C/svg%3E")',
           backgroundColor: '#f0fff4'
         }}>
      
      {/* Lottie animations - only render if both Lottie and animations are loaded */}
      {animationsLoaded && lottieModule && lottieModule.default && (
        <>
          {animationData.leaf && (
            <div className="absolute top-10 left-10 w-40 h-40 opacity-80 pointer-events-none">
              <lottieModule.default animationData={animationData.leaf} loop={true} />
            </div>
          )}
          
          {animationData.trees && (
            <div className="absolute bottom-10 left-10 w-60 h-60 opacity-70 pointer-events-none">
              <lottieModule.default animationData={animationData.trees} loop={true} />
            </div>
          )}
          
          {animationData.jungle && (
            <div className="absolute top-1/4 right-10 w-48 h-48 opacity-80 pointer-events-none">
              <lottieModule.default animationData={animationData.jungle} loop={true} />
            </div>
          )}
          
          {animationData.volunteer && (
            <div className="absolute bottom-10 right-10 w-52 h-52 opacity-75 pointer-events-none">
              <lottieModule.default animationData={animationData.volunteer} loop={true} />
            </div>
          )}
        </>
      )}
      
      {/* SVG Decorative Elements */}
      <div className="absolute top-10 left-10 transform -rotate-12 opacity-60 animate-bounce animation-delay-200">
        <LeafIcon />
      </div>
      <div className="absolute top-1/4 right-10 transform rotate-45 opacity-60 animate-bounce animation-delay-500">
        <LeafIcon />
      </div>
      <div className="absolute bottom-10 left-1/4 transform rotate-12 opacity-60 animate-bounce">
        <PawprintIcon />
      </div>
      <div className="absolute top-1/3 left-5 transform -rotate-6 opacity-70">
        <TreeIcon />
      </div>
      <div className="absolute bottom-20 right-10 transform rotate-12 opacity-70">
        <VolunteerIcon />
      </div>
      
      <div className="max-w-4xl w-full bg-white rounded-md border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)] p-8 relative z-10">
        {/* Vines at the top corners */}
        <div className="absolute -top-16 -left-10 transform rotate-45 opacity-80">
          <svg className="w-24 h-24 text-green-700" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M10,90 Q30,60 20,40 T30,10 M20,40 Q40,50 60,35 M30,10 Q50,20 70,5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="absolute -top-16 -right-10 transform -rotate-45 opacity-80">
          <svg className="w-24 h-24 text-green-700" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M90,90 Q70,60 80,40 T70,10 M80,40 Q60,50 40,35 M70,10 Q50,20 30,5" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="my-4 relative">
          {/* Leafy decorations around the title */}
          <div className="absolute -top-6 left-10 transform rotate-45">
            <LeafIcon />
          </div>
          <div className="absolute -top-6 right-10 transform -rotate-45">
            <LeafIcon />
          </div>

          <Card backgroundColor="bg-orange-500" textColor="text-black"> 
            <h1 className="text-3xl font-bold text-center p-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)]">
              Volunteer Registration
            </h1>
          </Card>
        </div>
        
        {error && (
          <div className="text-red-500 text-center mb-4 p-2 border-2 border-red-500 font-bold">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information Section Indicator */}
          <div className="col-span-full flex items-center gap-2 mt-2 mb-0 border-b-2 border-dashed border-green-500 pb-2">
            <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-bold text-green-800">Personal Information</span>
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-extrabold text-black mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border-3 border-black rounded-none px-3 py-2 bg-pink-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-extrabold text-black mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border-3 border-black rounded-none px-3 py-2 bg-pink-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Contact Information Section Indicator */}
          <div className="col-span-full flex items-center gap-2 mt-4 mb-0 border-b-2 border-dashed border-blue-500 pb-2">
            <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="font-bold text-blue-800">Contact Information</span>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-extrabold text-black mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-3 border-black rounded-none px-3 py-2 bg-blue-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-extrabold text-black mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-3 border-black rounded-none px-3 py-2 bg-blue-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Location Section Indicator */}
          <div className="col-span-full flex items-center gap-2 mt-4 mb-0 border-b-2 border-dashed border-green-500 pb-2">
            <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-bold text-green-800">Location Details</span>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-extrabold text-black mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border-3 border-black rounded-none px-3 py-2 bg-green-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-extrabold text-black mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border-3 border-black rounded-none px-3 py-2 bg-green-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-extrabold text-black mb-1">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border-3 border-black rounded-none px-3 py-2 bg-green-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* ZIP Code */}
          <div>
            <label className="block text-sm font-extrabold text-black mb-1">ZIP Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full border-3 border-black rounded-none px-3 py-2 bg-purple-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-extrabold text-black mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full border-3 border-black rounded-none px-3 py-2 bg-purple-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Skills Section Indicator */}
          <div className="col-span-full flex items-center gap-2 mt-4 mb-0 border-b-2 border-dashed border-orange-500 pb-2">
            <svg className="w-6 h-6 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
            <span className="font-bold text-orange-800">Skills & Experience</span>
          </div>

          {/* Skills */}
          <div className="md:col-span-2">
            <label className="block text-sm font-extrabold text-black mb-1">Skills</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full border-3 border-black rounded-none px-3 py-2 bg-orange-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>
          </div>

          {/* Submit Button with decorative elements */}
          <div className="col-span-full mt-6 relative">
            {/* Decorative leaves near submit button */}
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 rotate-45">
              <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3C9,14,14,12,22,8Z"/>
              </svg>
            </div>
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 -rotate-45">
              <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7,8C16,10,18.1,16.17,20.18,21.34L18.29,22l-1-2.3C15,14,10,12,2,8Z"/>
              </svg>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-extrabold text-black bg-green-500 border-4 border-black px-8 py-3 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Submitting...' : 'SUBMIT REGISTRATION'}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
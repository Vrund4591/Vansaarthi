"use client";

import React, { useState } from "react";
import Card from "./Card";
import bg from '/bg.jpg';

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
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
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
    
    <div className="min-h-screen flex items-center justify-center bg-black p-8 px-8 py-8" style={{
        backgroundImage: `url(${bg})`,
        width: '100%',
        height: '100%',
        bg : 'cover',}}>
      <div className="max-w-4xl w-full bg-black bg-opacity-50 rounded px-8 py-6">
        <div className="my-4 px-4 p-8">
        <Card backgroundColor="bg-orange-600" textColor="text-black"> 
          <h1 className="text-3xl font-bold  text-center px-1 p-2">Volunteer Registration</h1>
        </Card>
        </div>
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-white">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-green-400 bg-slate-100"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-white">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-green-400 bg-slate-100"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-green-400 bg-slate-100"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-white">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-green-400 bg-slate-100"
                required
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-green-400 bg-slate-100"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-white">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-green-400 bg-slate-100"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-white">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-green-400 bg-slate-100"
              />
            </div>

            {/* ZIP Code */}
            <div>
              <label className="block text-sm font-medium text-white">ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-green-400 bg-slate-100"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-white">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-green-400 bg-slate-100"
              />
            </div>

            {/* Skills */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white">Skills</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-green-400 bg-slate-100"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="col-span-full p-8 px-2 py-2  ">
            <Card backgroundColor="bg-[#3BDE3B]" textColor="text-white" justify="center">
            <button
              type="submit"
              disabled={loading}
              className={`col-span-full font-bold text-black px-96 mx-2 py-2 pr-2 p-2 text-center ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            
            </Card>
            </div>
          </form>
            
      </div>
    </div>
  );
}
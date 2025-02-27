import React,{useState,useEffect} from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import {jwtDecode} from "jwt-decode"
export default function LoginPage({navigate}) {
const[email,setemail]=useState("");
  const[password,setpassword]=useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
  if(!email || !password){
    toast.warning("Fill all field");
    return;
  }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/trainer/trainer-login`,
        { email, password }
      );
  
      if (response.status === 200 && response.data.success) {
        toast.success("Login successful!");
        const decoded = jwtDecode(response.data.token);
        console.log("Decoded Token:", decoded);
        localStorage.setItem("trainerToken", response.data.token);
  
        setTimeout(() => {
       navigate("dashboard")
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed!");
      } else {
        toast.error("Server error. Please try again later.");
      }
    }
  };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome Back
          </h2>

          <form className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300"
              onClick={handlesubmit}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }
  
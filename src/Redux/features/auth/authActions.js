import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../Services/API";
import toast from "react-hot-toast";


export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);


        if(data.user.role==="donar"){
          window.location.replace("/donar");
        }
        else if(data.user.role==="admin"){
          window.location.replace("/admin");
        }
        else if(data.user.role==="hospital"){
          window.location.replace("/hospital");
        }
        else if(data.user.role==="organisation"){
          window.location.replace("/organisation");
        }
        
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return toast.error(error.response.data.message);
      } else {
        return toast.error(error.message);
      }
    }
  }
);

//register
// export const userRegister = createAsyncThunk(
//   "auth/register",
//   async (
//     {
//       name,
//       role,
//       email,
//       password,
//       phone,
//       organisationName,
//       address,
//       hospitalName,
//       website,
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const { data } = await API.post("/auth/register", {
//         name,
//         role,
//         email,
//         password,
//         phone,
//         organisationName,
//         address,
//         hospitalName,
//         website,
//       });
//       if (data?.success) {
//         alert("User Registerd Successfully");
//         window.location.replace("/login");
//         // toast.success("User Registerd Successfully");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error('failed')
//       // if (error.response && error.response.data.message) {
//       //   return rejectWithValue(error.response.data.message);
//       // } else {
//       //   return rejectWithValue(error.message);
//       // }
//     }
//   }
// );

// export const userRegister = createAsyncThunk(
//   "auth/register",
//   async (
//     {
//       name,
//       role,
//       email,
//       password,
//       phone,
//       organisationName,
//       address,
//       hospitalName,
//       website,
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const { data } = await API.post("/auth/register", {
//         name,
//         role,
//         email,
//         password,
//         phone,
//         organisationName,
//         address,
//         hospitalName,
//         website,
//       });
//       if (data?.success) {
//         toast.success("User registered successfully!");
//         window.location.replace("/login");
//         return data;
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || error.message || "Something went wrong!";
//       toast.error(errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      role,
      email,
      password,
      phone,
      organisationName,
      address,
      hospitalName,
      website,
    }
  ) => {
    try {
      const 
      { data } = await API.post("/auth/register", {
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        hospitalName,
        website,
      });

      if (data?.success) {
        toast.success("User Registered Successfully")
        window.location.replace("/login");
        return data; // Ensure to return the complete data, including user
      }
      else{
        toast.error("Something went Wrong");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return toast.error(error.response.data.message);
      } else {
        return toast.error(error.message);
      }
    }
  }
);

//current user
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async ({ rejectWithValue }) => {
    try {
      const res = await API.get("/auth/current-user");
      if (res.data) {
        return res?.data;
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

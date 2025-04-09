import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../Services/API";
import toast from "react-hot-toast";
export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
  try {
    const response = await API.get("/payment/getId");  // ✅ Correct path
    console.log("response",response);
    
    return response.data.razorpay_keyID;
  } catch (error) {
    toast.error("Failed to load data");
    throw error;  // Ensure error handling
  }
});


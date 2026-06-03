import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Define the shape of your backend's successful response matching your Express Login Controller
interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  merchant: {
    id: string;
    name: string;
    email: string;
  };
}

// Specify the expected inputs from your form fields
interface LoginInput {
  email: string;
  password: string;
}

export const useMerchantLogin = () => {
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: async (credentials) => {
      // Replace with your actual Express API Base URL
      const response = await axios.post<LoginResponse>(
        "http://localhost:8080/api/v1/auth/login", 
        credentials
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Login successful:", data.message);
      
      // Save the JWT token safely
      localStorage.setItem("token", data.token);
      localStorage.setItem("merchant", JSON.stringify(data.merchant));
      
      // Redirect your merchant to the admin dashboard panel
      window.location.href = "/admin/dashboard/overview";
    },
    onError: (error: any) => {
      // Gracefully catches custom backend error messages thrown by your AuthService
      const backendMessage = error.response?.data?.message || "Something went wrong!";
      alert(backendMessage);
    },
  });
};
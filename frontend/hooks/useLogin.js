import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../Context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) return ;
    setLoading(true);
    try {
      //   const res = await fetch("http://localhost:8000/api/auth/login", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ email, password }),
      //   });
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Allow requests from all origins (replace * with specific origin if needed)
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Allow specific HTTP methods
          "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow specific headers
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // const data = await res.json();

      if (!data || res.status !== 200) {
        throw new Error(data?.error || "Incorrect Credential");
      }

      // localStorage.setItem("chat-user", JSON.stringify(data));
            localStorage.setItem(
              "chat-user",
              JSON.stringify({
                _id:data._id,
                username: data.username,
                email: data.email,
                dob: data.dob,
                universityname: data.universityname,
              })
            );

      setAuthUser(data);
            return data;


    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(email, password) {
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}

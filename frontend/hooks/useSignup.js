// // // import { useState } from "react";
// // // import toast from "react-hot-toast";
// // // // import { useAuthContext } from "../context/AuthContext";

// // // const useSignUp = () => {
// // //   const [loading, setLoading] = useState(false);
// // // //   const { setAuthUser } = useAuthContext();
// // //   const signup = async ({
// // //     username,
// // //     email,
// // //     universityname,
// // //     dob,
// // //     password,
// // //     cpassword,
// // //   }) => {
// // //     const isSuccess = handleInputErrors({
// // //       username,
// // //       email,
// // //       universityname,
// // //       dob,
// // //       password,
// // //       cpassword,
// // //     });

// // //     if (!isSuccess) {
// // //       return;
// // //     }

// // //     setLoading(true);

// // //     try {
// // //       const response = await fetch("http://localhost:8000/signup", {
// // //         method: "POST", // Fixed typo here
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           username,
// // //           email,
// // //           universityname,
// // //           dob,
// // //           password,
// // //           cpassword,
// // //         }),
// // //       });

// // //       const data = await response.json();
// // //       setLoading(false);
// // //       if (data.error) {
// // //         throw new Error(data.error);
// // //       }
// // //     //   localStorage.setItem("chat-user", JSON.stringify(data));
// // //       // return data; // Returning the data from the API call
// // //     //   setAuthUser(data);
// // //     } catch (err) {
// // //       console.log(err);
// // //       setLoading(false);
// // //       return null;
// // //     }
// // //   };

// // //   return { loading, signup };
// // // };

// // // function handleInputErrors({
// // //   username,
// // //   email,
// // //    universityname,
// // //    dob,
// // //   password,
// // //   cpassword,
// // // }) {
// // //   if (!username || !email ||!password || !cpassword) {
// // //     toast.error("Please fill all the fields");
// // //     return false;
// // //   }
// // //   if (password !== cpassword) {
// // //     toast.error("Password does not match");
// // //     return false;
// // //   }
// // //   if (password.length < 6) {
// // //     toast.error("Password must be at least 6 characters");
// // //     return false;
// // //   }
// // //   return true;
// // // }

// // // export default useSignUp;

// // import { useState } from "react";
// // // import toast from "react-hot-toast";
// // import { toast } from "react-toastify";
// // const useSignUp = () => {
// //   const [loading, setLoading] = useState(false);

// //   const signup = async ({
// //     username,
// //     email,
// //     universityname,
// //     dob,
// //     password,
// //     cpassword,
// //   }) => {
// //     const isSuccess = handleInputErrors({
// //       username,
// //       email,
// //       universityname,
// //       dob,
// //       password,
// //       cpassword,
// //     });

// //     if (!isSuccess) {
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const response = await fetch("http://localhost:8000/signup", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           username,
// //           email,
// //           universityname,
// //           dob,
// //           password,
// //           cpassword,
// //         }),
// //       });

// //       const data = await response.json();
// //       setLoading(false);
// //       if (data.error) {
// //         toast.error(data.error); // Show error message using toast
// //         throw new Error(data.error);
// //       }
// //     } catch (err) {
// //       console.log(err);
// //       setLoading(false);
// //       return null;
// //     }
// //   };

// //   return { loading, signup };
// // };

// // function handleInputErrors({
// //   username,
// //   email,
// //   universityname,
// //   dob,
// //   password,
// //   cpassword,
// // }) {
// //   if (!username || !email || !password || !cpassword) {
// //     toast.error("Please fill all the fields");
// //     return false;
// //   }
// //   if (password !== cpassword) {
// //     toast.error("Password does not match");
// //     return false;
// //   }
// //   if (password.length < 6) {
// //     toast.error("Password must be at least 6 characters");
// //     return false;
// //   }
// //   return true;
// // }

// // export default useSignUp;

// import { useState } from "react";
// import toast from "react-hot-toast";
// // import { useAuthContext } from "../context/AuthContext";

// const useSignUp = () => {
//   const [loading, setLoading] = useState(false);
// //   const { setAuthUser } = useAuthContext();
//   const signup = async ({
//     username,
//     email,
//     universityname,
//     dob,
//     password,
//     cpassword,
//   }) => {
//     const isSuccess = handleInputErrors({
//       username,
//       email,
//       universityname,
//       dob,
//       password,
//       cpassword,
//     });

//     if (!isSuccess) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:8000/signup", {
//         method: "POST", // Fixed typo here
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username,
//           email,
//           universityname,
//           dob,
//           password,
//           cpassword,
//         }),
//       });

//       const data = await response.json();
//       setLoading(false);
//       if (data.error) {
//         throw new Error(data.error);
//       }
//       //   localStorage.setItem("chat-user", JSON.stringify(data));
//       // return data; // Returning the data from the API call
//       //   setAuthUser(data);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//       return null;
//     }
//   };

//   return { loading, signup };
// };

// function handleInputErrors({
//   username,
//   email,
//   universityname,
//   dob,
//   password,
//   cpassword,
// }) {
//   if (!username || !email || !password || !cpassword) {
//     toast.error("Please fill all the fields");
//     return false;
//   }
//   if (password !== cpassword) {
//     toast.error("Password does not match");
//     return false;
//   }
//   if (password.length < 6) {
//     toast.error("Password must be at least 6 characters");
//     return false;
//   }
//   return true;
// }

// export default useSignUp;

import { useState } from "react";
import { toast } from "react-toastify";

const useSignUp = () => {
  // const [loading, setLoading] = useState(false);

  const signup = async ({
    username,
    email,
    universityname,
    dob,
    password,
    cpassword,
  }) => {
    const isSuccess = handleInputErrors({
      username,
      email,
      universityname,
      dob,
      password,
      cpassword,
    });

    if (!isSuccess) {
      return;
    }

    // setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          universityname,
          dob,
          password,
          cpassword,
        }),
      });

      const data = await response.json();
      // setLoading(false);

      if (!data || response.status === 402) {
        // if (!data === "User already exists") {
        //   toast.error("User already exists"); // Show specific error message using toast
        // } else {
        //   toast.error("User already exists"); // Show other error messages using toast
        // }
        toast.error("User already exists");
        // throw new Error(data.error);
      } else if (response.status === 200) {
        toast.success("Signup successful!");
        return { data, status: response.status };
      } else {
        toast.success("Signup successful!"); // If no error, show success message
      }
    
    } catch (err) {
      console.log(err);
      // setLoading(false);
      return null;
    }
  };

  return { signup };
};

function handleInputErrors({
  username,
  email,
  universityname,
  dob,
  password,
  cpassword,
}) {
  if (!username || !email || !password || !cpassword) {
    toast.error("Please fill all the fields");
    return false;
  }
  if (password !== cpassword) {
    toast.error("Password does not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}

export default useSignUp;

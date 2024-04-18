const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const userController = require("./Controllers/authUser");
// Load environment variables
require("dotenv").config();
const User = require('./models/User'); // Import the User model
// Middleware
app.use(express.json());
app.use(cors());
app.use("/files", express.static("files"));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch((e) => {
    console.error("MongoDB connection error:", e.message);
  });
app.post("/signup", userController.signup);
app.post("/login", userController.login);

app.put("/user/:id", async (req, res) => {
  try {
            console.log("Request params:", req.params); // Log request params
            console.log("Request body:", req.body);  
    const { id} = req.params;
    const { username,  dob, universityname } = req.body;

    // Find user by ID and update
    const user = await User.findByIdAndUpdate(
      id,
      { username, dob, universityname },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      dob: user.dob,
      universityname: user.universityname,
    };

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("PUT /user/:id error:", error); // Add error logging here
    res.status(500).json({ error: "Internal server errororrrrrr" });
  }
});

// app.get("/about", authenticate, (req, res) => {
//   console.log("hello world this is about page");
//   // res.send("hello world this is about page");
//   res.send(req.rootUser);
// });
// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Mongoose Model
require("./pdfDetails");
const PdfSchema = mongoose.model("PdfDetails");

// Routes
app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    await PdfSchema.create({ title: title, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    console.error("Error uploading file:", error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/get-files", async (req, res) => {
  try {
    const data = await PdfSchema.find({});
    res.send({ status: "ok", data: data });
  } catch (error) {
    console.error("Error fetching files:", error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});// Update PDF title
app.put('/update-title/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const updatedPdf = await PdfSchema.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );

    if (!updatedPdf) {
      return res.status(404).json({ status: 'error', message: 'PDF not found' });
    }

    res.json({ status: 'ok', data: updatedPdf });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});


// Delete PDF file
app.delete('/delete-file/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPdf = await PdfSchema.findByIdAndDelete(id);

    if (!deletedPdf) {
      return res.status(404).json({ status: 'error', message: 'PDF not found' });
    }

    res.json({ status: 'ok', message: 'PDF deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});


// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const cors = require("cors");
// const multer = require("multer");
// const userController = require("./Controllers/authUser");
// const User = require("./models/User"); // Import the User model

// // Load environment variables
// require("dotenv").config();

// // Middleware
// app.use(express.json());
// app.use(cors());
// app.use("/files", express.static("files"));
// app.use("/profilePictures", express.static("profilePictures")); // Serve profile pictures

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to Mongodb");
//   })
//   .catch((e) => {
//     console.error("MongoDB connection error:", e.message);
//   });

// app.post("/signup", userController.signup);
// app.post("/login", userController.login);

// app.put("/user/:id", async (req, res) => {
//   try {
//     console.log("Request params:", req.params); // Log request params
//     console.log("Request body:", req.body);
//     const { id } = req.params;
//     const { username, dob, universityname } = req.body;

//     // Find user by ID and update
//     const user = await User.findByIdAndUpdate(
//       id,
//       { username, dob, universityname },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const updatedUser = {
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       dob: user.dob,
//       universityname: user.universityname,
//     };

//     res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error("PUT /user/:id error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Multer configuration for files
// const storageFiles = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./files");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// const uploadFiles = multer({ storage: storageFiles });

// // Multer configuration for profile picture
// const storageProfilePicture = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./profilePictures");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// const uploadProfilePicture = multer({ storage: storageProfilePicture });

// // Mongoose Model
// require("./pdfDetails");
// const PdfSchema = mongoose.model("PdfDetails");

// // Routes
// app.post("/upload-files", uploadFiles.single("file"), async (req, res) => {
//   console.log(req.file);
//   const title = req.body.title;
//   const fileName = req.file.filename;
//   try {
//     await PdfSchema.create({ title: title, pdf: fileName });
//     res.send({ status: "ok" });
//   } catch (error) {
//     console.error("Error uploading file:", error.message);
//     res.status(500).json({ status: "error", message: error.message });
//   }
// });

// app.post(
//   "/upload-profile-picture",
//   uploadProfilePicture.single("image"),
//   async (req, res) => {
//     try {
//       const userId = req.body.userId;
//       const imagePath = req.file.filename;

//       // Find user by ID and update profile picture
//       const user = await User.findByIdAndUpdate(
//         userId,
//         { profilePicture: imagePath },
//         { new: true }
//       );

//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }

//       res.status(200).json({ image: imagePath });
//     } catch (error) {
//       console.error("Error uploading profile picture:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// );

// app.get("/get-files", async (req, res) => {
//   try {
//     const data = await PdfSchema.find({});
//     res.send({ status: "ok", data: data });
//   } catch (error) {
//     console.error("Error fetching files:", error.message);
//     res.status(500).json({ status: "error", message: error.message });
//   }
// });

// app.get("/", async (req, res) => {
//   res.send("Success!!!!!!");
// });

// // Update PDF title
// app.put("/update-title/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title } = req.body;

//     const updatedPdf = await PdfSchema.findByIdAndUpdate(
//       id,
//       { title },
//       { new: true }
//     );

//     if (!updatedPdf) {
//       return res
//         .status(404)
//         .json({ status: "error", message: "PDF not found" });
//     }

//     res.json({ status: "ok", data: updatedPdf });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: error.message });
//   }
// });

// // Delete PDF file
// app.delete("/delete-file/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedPdf = await PdfSchema.findByIdAndDelete(id);

//     if (!deletedPdf) {
//       return res
//         .status(404)
//         .json({ status: "error", message: "PDF not found" });
//     }

//     res.json({ status: "ok", message: "PDF deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: error.message });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });





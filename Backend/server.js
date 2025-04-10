const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig"); // Cloudinary configuration file
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const cors = require("cors");
const mongoose = require("mongoose"); // Add mongoose import
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const patientController = require('./controllers/patient');
const doctorController = require('./controllers/doctor');
const { storage } = require('./utils/cloudinary');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Handle MongoDB connection errors
mongoose.connection.on("error", err => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json()); // ✅ Ensure JSON body parsing
app.use(express.urlencoded({ extended: true })); // ✅ Add support for form data
app.use(cookieParser());

// Auth Routes
app.use('/auth', authRoutes);

const doctorPhotoUpload = multer({ storage });
app.post(
  '/api/doctors/register',
  (req, res, next) => {
    doctorPhotoUpload.single('profilePhoto')(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          console.error('Multer error:', err);
          return res.status(400).json({ error: 'File upload error', details: err.message });
        } else {
          console.error('Other error:', err);
          return res.status(400).json({ error: 'Invalid file type', details: err.message });
        }
      }
      next();
    });
  },
  doctorController.registerDoctor
);

const uploads = multer({ storage });
// Use chained middleware to first upload the profile image then the documents,
// and finally call the controller function.
app.post(
  '/api/patients/register',
  uploads.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'documents', maxCount: 5 }
  ]),
  patientController.registerPatient
);

// ✅ Authentication Middleware (Auth0)
const checkAuth = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    audience: process.env.AUTH0_AUDIENCE, // ✅ Ensure audience matches Auth0 API
    issuer: `https://${process.env.AUTH0_DOMAIN}/`, // ✅ Ensure correct issuer
    algorithms: ["RS256"],
  });
  

// // ✅ Cloudinary Storage (Organized Per User)
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     if (!req.auth) {
//       throw new Error("Unauthorized user");
//     }

//     const username = req.auth.sub.replace("|", "_"); // Unique folder for each user
//     return {
//       folder: `patient_reports/${username}`, // ✅ User-specific folder
//       public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`,
//       resource_type: "auto",
//     };
//   },
// });

// const upload = multer({ 
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype !== "application/pdf") {
//       return cb(new Error("Only PDF files are allowed"));
//     }
//     cb(null, true);
//   }
// });

// // ✅ Debug Incoming Requests
// app.use((req, res, next) => {
//     console.log("Incoming Authorization Header:", req.headers.authorization); // ✅ Debug
//     next();
//   });
  

// // ✅ Upload Report (Protected Route)
// app.post("/upload_report", checkAuth, upload.single("file"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   console.log("Cloudinary Upload Successful:", req.file.path);
//   res.json({ url: req.file.path });
// });

// // ✅ Fetch Reports for the Authenticated User
// app.get("/get_reports", checkAuth, async (req, res) => {
//   try {
//     const username = req.auth.sub.replace("|", "_"); // Same structure as upload
//     const { resources } = await cloudinary.search
//       .expression(`folder:patient_reports/${username}`)
//       .sort_by("created_at", "desc")
//       .max_results(10)
//       .execute();

//     res.json(resources.map(file => ({ url: file.secure_url, name: file.public_id })));
//   } catch (error) {
//     console.error("Error fetching reports:", error);
//     res.status(500).json({ error: "Failed to fetch reports", details: error.message });
//   }
// });

// Profile update routes (protected)
// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

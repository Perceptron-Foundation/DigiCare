const express = require('express');
const multer = require('multer');
const cloudinary = require('./cloudinaryConfig'); // Import Cloudinary config
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());
// Configure multer to use Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'patient_reports',
      resource_type: 'auto',
    },
  });
  
  const upload = multer({ storage });
  
  // Route to upload reports
  app.post('/upload_report', (req, res) => {
    upload.single('file')(req, res, (err) => {
      if (err) {
        console.error('Multer Error:', err.message);
        return res.status(500).json({ error: 'Multer Error', details: err.message });
      }
  
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      console.log('Uploaded File:', req.file);
      res.json({ url: req.file.path });
    });
  });
  app.get('/get_reports', async (req, res) => {
    try {
      const { resources } = await cloudinary.search
        .expression('folder:patient_reports') // Fetch only files from this folder
        .sort_by('created_at', 'desc')
        .max_results(10)
        .execute();
  
      res.json(resources.map(file => ({ url: file.secure_url, name: file.public_id })));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reports', details: error.message });
    }
  });
  
  
  
  
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// // const express = require('express');
// // const multer = require('multer');
// // const cloudinary = require('./cloudinaryConfig'); // Import Cloudinary config
// // const { CloudinaryStorage } = require('multer-storage-cloudinary');
// // const { expressjwt: jwt } = require('express-jwt');
// // const jwks = require('jwks-rsa');
// // const cors = require('cors');
// // require('dotenv').config();

// // const app = express();
// // const PORT =  3000;
// // app.use(cors());

// // // ✅ Authentication Middleware (Auth0)


// // const checkAuth = jwt({
// //   secret: jwks.expressJwtSecret({
// //     cache: true,
// //     rateLimit: true,
// //     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
// //   }),
// //   audience: process.env.AUTH0_AUDIENCE,
// //   issuer: `https://${process.env.AUTH0_DOMAIN}/`,
// //   algorithms: ["RS256"],
// // });

// // // ✅ Cloudinary Storage for Multer
// // const storage = new CloudinaryStorage({
// //   cloudinary: cloudinary,
// //   params: async (req, file) => {
// //     const username = req.user?.sub.includes('|') ? req.user.sub.split('|')[1] : req.user.sub;
// //     return {
// //       folder: `patient_reports/${username}`, 
// //       public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`,
// //       resource_type: 'auto',
// //     };
// //   },
// // });

// // const upload = multer({ 
// //   storage,
// //   fileFilter: (req, file, cb) => {
// //     if (file.mimetype !== 'application/pdf') {
// //       return cb(new Error('Only PDF files are allowed'));
// //     }
// //     cb(null, true);
// //   }
// // });
// // app.use((req, res, next) => {
// //   console.log("Incoming Authorization Header:", req.headers.authorization);
// //   next();
// // });
// // // ✅ Route to Upload Reports (Protected)
// // app.post('/upload_report', checkAuth, upload.single('file'), (req, res) => {
// //   if (!req.file) {
// //     return res.status(400).json({ error: 'No file uploaded' });
// //   }

// //   console.log('Cloudinary Upload Successful:', req.file.path);
// //   res.json({ url: req.file.path });
// // });

// // // ✅ Route to Fetch Reports (User-Specific)
// // app.get('/get_reports', checkAuth, async (req, res) => {
// //   try {
// //     const username = req.user?.sub.includes('|') ? req.user.sub.split('|')[1] : req.user.sub;
    
// //     const { resources } = await cloudinary.search
// //       .expression(`folder:patient_reports/${username}`) 
// //       .sort_by('created_at', 'desc')
// //       .max_results(10)
// //       .execute();

// //     res.json(resources.map(file => ({ url: file.secure_url, name: file.public_id })));
// //   } catch (error) {
// //     console.error("Error fetching reports:", error);
// //     res.status(500).json({ error: 'Failed to fetch reports', details: error.message });
// //   }
// // });

// // // ✅ Start Server
// // app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));




// // const express = require('express');
// // const multer = require('multer');
// // const cloudinary = require('./cloudinaryConfig'); // Import Cloudinary config
// // const { CloudinaryStorage } = require('multer-storage-cloudinary');
// // require('dotenv').config();

// // const app = express();
// // const PORT = 3000;
// // const cors = require('cors');
// // app.use(cors());
// // // Configure multer to use Cloudinary storage
// // const storage = new CloudinaryStorage({
// //     cloudinary: cloudinary,
// //     params: {
// //       folder: 'patient_reports',
// //       resource_type: 'auto',
// //     },
// //   });
  
// //   const upload = multer({ storage });
  
// //   // Route to upload reports
// //   app.post('/upload_report', (req, res) => {
// //     upload.single('file')(req, res, (err) => {
// //       if (err) {
// //         console.error('Multer Error:', err.message);
// //         return res.status(500).json({ error: 'Multer Error', details: err.message });
// //       }
  
// //       if (!req.file) {
// //         return res.status(400).json({ error: 'No file uploaded' });
// //       }
  
// //       console.log('Uploaded File:', req.file);
// //       res.json({ url: req.file.path });
// //     });
// //   });
// //   app.get('/get_reports', async (req, res) => {
// //     try {
// //       const { resources } = await cloudinary.search
// //         .expression('folder:patient_reports') // Fetch only files from this folder
// //         .sort_by('created_at', 'desc')
// //         .max_results(10)
// //         .execute();
  
// //       res.json(resources.map(file => ({ url: file.secure_url, name: file.public_id })));
// //     } catch (error) {
// //       res.status(500).json({ error: 'Failed to fetch reports', details: error.message });
// //     }
// //   });
  
  
  
  
// //   app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));




// const express = require('express');
// const multer = require('multer');
// const cloudinary = require('./cloudinaryConfig'); 
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cors = require('cors');
// const checkJwt = require('./authMiddleware'); // Import Auth0 middleware

// require('dotenv').config();
// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json()); // For parsing JSON bodies

// // Configure multer with Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     const username = req.auth?.nickname || 'unknown_user'; // Get username from Auth0 token
//     return {
//       folder: `patient_reports/${username}`, // Store files in user-specific folder
//       resource_type: 'auto',
//       public_id: `${Date.now()}_${file.originalname}`, // Use meaningful filenames
//     };
//   },
// });

// // Multer upload middleware
// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype !== 'application/pdf') {
//       return cb(new Error('Only PDF files are allowed'), false);
//     }
//     cb(null, true);
//   },
// });

// // Protected route to upload reports
// app.post('/upload_report', checkJwt, (req, res) => {
//   upload.single('file')(req, res, (err) => {
//     if (err) {
//       console.error('Upload Error:', err.message);
//       return res.status(400).json({ error: err.message });
//     }

//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     res.json({ url: req.file.path });
//   });
// });

// // Protected route to fetch reports
// app.get('/get_reports', checkJwt, async (req, res) => {
//   try {
//     const username = req.auth?.nickname || 'unknown_user';
//     const { resources } = await cloudinary.search
//       .expression(`folder:patient_reports/${username}`) // Fetch only user's reports
//       .sort_by('created_at', 'desc')
//       .max_results(10)
//       .execute();

//     res.json(resources.map(file => ({ url: file.secure_url, name: file.public_id })));
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch reports', details: error.message });
//   }
// });

// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// // const express = require('express');
// // const multer = require('multer');
// // const cloudinary = require('./cloudinaryConfig'); // Import Cloudinary config
// // const { CloudinaryStorage } = require('multer-storage-cloudinary');
// // const { expressjwt: jwt } = require('express-jwt');
// // const jwtt = require("jsonwebtoken");

// // const jwks = require('jwks-rsa');
// // const cors = require('cors');
// // require('dotenv').config();

// // const app = express();
// // const PORT = 3000;
// // app.use(cors());
// // const checkAuth = jwt({
// //   secret: jwks.expressJwtSecret({
// //     cache: true,
// //     rateLimit: true,
// //     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
// //   }),
// //   audience: process.env.AUTH0_AUDIENCE,
// //   issuer: `https://${process.env.AUTH0_DOMAIN}/`,
// //   algorithms: ["RS256"],
// // });

// // const checkAuth = (req, res, next) => {
// //   console.log("Received Auth Header:", req.headers.authorization);

// //   if (!req.headers.authorization) {
// //     return res.status(401).json({ error: "No token provided" });
// //   }

// //   const token = req.headers.authorization.split(" ")[1];
// //   console.log("Extracted Token:", token);

// //   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
// //     if (err) {
// //       console.error("JWT Verification Error:", err.message);
// //       return res.status(401).json({ error: "Invalid token" });
// //     }
// //     req.user = decoded;
// //     next();
// //   });
// // };
// // const checkAuth = (req, res, next) => {
// //   const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token

// //   if (!token) {
// //     return res.status(401).json({ error: "No token provided" });
// //   }

// //   jwtt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
// //     if (err) {
// //       return res.status(401).json({ error: "Invalid token" });
// //     }
// //     req.user = decoded;
// //     next();
// //   });
// // };



// // 🔹 Multer Storage Configuration (With Dynamic Folder Name)
// // const storage = new CloudinaryStorage({
// //   cloudinary: cloudinary,
// //   params: async (req, file) => {
// //     const username = req.user?.sub.split('|')[1]; // Extract username from token
// //     return {
// //       folder: `patient_reports/${username}`, // Store files in "patient_reports/username/"
// //       public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`, // Meaningful filenames
// //       resource_type: 'auto',
// //     };
// //   },
// // });

// // const upload = multer({ 
// //   storage,
// //   fileFilter: (req, file, cb) => {
// //     if (file.mimetype !== 'application/pdf') {
// //       return cb(new Error('Only PDF files are allowed'));
// //     }
// //     cb(null, true);
// //   }
// // });
// // app.use((req, res, next) => {
// //   console.log("Incoming Authorization Header:", req.headers.authorization);
// //   next();
// // });

// // // ✅ Route to Upload Reports (Protected)
// // app.post('/upload_report', checkAuth, upload.single('file'), (req, res) => {
// //   if (!req.file) {
// //     return res.status(400).json({ error: 'No file uploaded' });
// //   }

// //   let streamUpload = (fileBuffer) => {
// //     return new Promise((resolve, reject) => {
// //       let stream = cloudinary.uploader.upload_stream(
// //         { resource_type: "raw" },
// //         (error, result) => {
// //           if (result) resolve(result);
// //           else reject(error);
// //         }
// //       );
// //       streamifier.createReadStream(fileBuffer).pipe(stream);
// //     });
// //   };

// //   streamUpload(req.file.buffer)
// //     .then((result) => {
// //       console.log('Cloudinary Upload Successful:', result.secure_url);
// //       res.json({ url: result.secure_url });
// //     })
// //     .catch((error) => {
// //       console.error('Cloudinary Upload Error:', error);
// //       res.status(500).json({ error: 'Cloudinary Upload Failed', details: error });
// //     });
// // });

// // // ✅ Route to Fetch Reports (User-Specific)
// // app.get('/get_reports', checkAuth, async (req, res) => {
// //   console.log("User from token:", req.user); 
// //   try {
// //     const username = req.user?.sub.split('|')[1]; // Extract username from token

// //     const { resources } = await cloudinary.search
// //       .expression(`folder:patient_reports/${username}`) // Fetch only user's files
// //       .sort_by('created_at', 'desc')
// //       .max_results(10)
// //       .execute();

// //     res.json(resources.map(file => ({ url: file.secure_url, name: file.public_id })));
// //   } catch (error) {
// //     res.status(500).json({ error: 'Failed to fetch reports', details: error.message });
// //   }
// // });

// // app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


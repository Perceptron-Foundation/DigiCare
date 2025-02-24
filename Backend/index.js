const express = require('express');
const multer = require('multer');
const cloudinary = require('./cloudinaryConfig'); // Import Cloudinary config
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

const app = express();
const PORT = 3000;

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
  
  
  
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

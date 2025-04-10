// controllers/patientController.js
const Patient = require('../models/patient');
const User = require('../models/user');

exports.registerPatient = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Files:', req.files);

    // Destructure fields from req.body
    // Note: the patient form sends "name" as the full name and "familyHistory" for familyMedicalHistory
    const {
      name, // maps to fullName in your model
      email,
      phone,
      dob,
      gender,
      age,
      maritalStatus,
      bloodGroup,
      address,
      medicalHistory,
      currentMedications,
      familyHistory // maps to familyMedicalHistory
    } = req.body;

    // Extract Cloudinary URLs from files
    const profileImageFiles = req.files.profileImage;
    const documentsFiles = req.files.documents;
    const profilePhoto = profileImageFiles && profileImageFiles[0] ? profileImageFiles[0].path : null;
    const documents = documentsFiles ? documentsFiles.map(file => file.path) : [];

    // Validate required fields
    if (!name || !email || !phone || !dob || !gender || !age ||
        !maritalStatus || !bloodGroup || !address || !medicalHistory || !familyHistory) {
      return res.status(400).json({
        error: 'All required fields must be provided',
        missingFields: {
          name: !name,
          email: !email,
          phone: !phone,
          dob: !dob,
          gender: !gender,
          age: !age,
          maritalStatus: !maritalStatus,
          bloodGroup: !bloodGroup,
          address: !address,
          medicalHistory: !medicalHistory,
          familyHistory: !familyHistory
        }
      });
    }

    // Create a new Patient document (assuming you're using Mongoose)
    const newPatient = new Patient({
      fullName: name,
      email,
      phoneNumber: phone,
      dateOfBirth: new Date(dob),
      gender,
      age: parseInt(age, 10),
      maritalStatus,
      bloodGroup,
      address,
      medicalHistory,
      currentMedications,
      familyMedicalHistory: familyHistory,
      profilePhoto,
      documents,
    });

    await newPatient.save();

    // Optionally, update a corresponding user record if necessary
    const user = await User.findOne({ email });
    if (user) {
      user.userType = 'patient';
      user.typeId = newPatient._id;
      user.profileCompleted = true;
      await user.save();
    }

    res.status(201).json({
      message: 'Patient registered successfully',
      patient: {
        id: newPatient._id,
        fullName: newPatient.fullName,
        email: newPatient.email,
        gender: newPatient.gender,
        bloodGroup: newPatient.bloodGroup,
      }
    });
  } catch (error) {
    console.error('Patient registration error:', error);
    res.status(500).json({
      error: 'Failed to register patient',
      details: error.message
    });
  }
};

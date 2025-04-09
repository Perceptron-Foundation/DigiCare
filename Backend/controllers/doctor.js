const Doctor = require('../models/doctor');
const User = require('../models/user');

exports.registerDoctor = async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        console.log('Received files:', req.files);

        const {
            fullName,
            gender,
            dob,
            email,
            phone,
            clinicAddress,
            city,
            state,
            country,
            availableHours,
            registrationNumber,
            specialization,
            experience,
            degrees
        } = req.body;

        console.log('Extracted fields:', {
            fullName, gender, dob, email, phone, clinicAddress, 
            city, state, country, availableHours, registrationNumber, 
            specialization, experience, degrees
        });

        // Get profile photo URL if file was uploaded
        const profilePhoto = req.file ? req.file.path : null;

        // Validate required fields
        if (!fullName || !gender || !dob || !email || !phone || !clinicAddress || 
            !city || !state || !country || !availableHours || !registrationNumber || 
            !specialization || !experience || !degrees) {
            return res.status(400).json({
                error: 'All fields are required',
                missingFields: {
                    fullName: !fullName,
                    gender: !gender,
                    dob: !dob,
                    email: !email,
                    phone: !phone,
                    clinicAddress: !clinicAddress,
                    city: !city,
                    state: !state,
                    country: !country,
                    availableHours: !availableHours,
                    registrationNumber: !registrationNumber,
                    specialization: !specialization,
                    experience: !experience,
                    degrees: !degrees
                }
            });
        }

        // Check if doctor already exists with this email
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({
                error: 'Doctor with this email already exists'
            });
        }

        // Create new doctor
        const doctor = new Doctor({
            fullName,
            gender,
            dateOfBirth: new Date(dob),
            email,
            phoneNumber: phone,
            profilePhoto,
            clinicAddress,
            city,
            state,
            country,
            availableHours,
            registrationNumber,
            specializations: [specialization],
            yearsOfExperience: parseInt(experience),
            degrees: [degrees],
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });

        await doctor.save();

        // Update user profile with doctor reference
        const user = await User.findOne({ email });
        if (user) {
            user.userType = 'doctor';
            user.typeId = doctor._id;
            user.profileCompleted = true;
            await user.save();
        }

        res.status(201).json({
            message: 'Doctor registered successfully',
            doctor: {
                id: doctor._id,
                fullName: doctor.fullName,
                email: doctor.email,
                specializations: doctor.specializations,
                registrationNumber: doctor.registrationNumber
            }
        });

    } catch (error) {
        console.error('Doctor registration error:', error);
        res.status(500).json({
            error: 'Failed to register doctor',
            details: error.message
        });
    }
}; 
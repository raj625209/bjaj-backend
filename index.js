const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({
    origin: 'https://bjaj-frontend.vercel.app/',
    credentials: true
  }));

// Constants for user details
const USER_ID = "prince_ranjan_23112002";
const EMAIL = "raj625209@gmail.com";
const ROLL_NUMBER = "22BCS12733";

// POST endpoint /bfhl
app.post('/bfhl', (req, res) => {
    try {
        // Input validation
        if (!req.body.data || !Array.isArray(req.body.data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input: data array is required"
            });
        }

        // Process the data array
        const numbers = req.body.data.filter(item => !isNaN(item));
        const alphabets = req.body.data.filter(item => /^[A-Za-z]$/.test(item));
        
        // Find highest alphabet (case insensitive)
        let highest_alphabet = [];
        if (alphabets.length > 0) {
            const highest = alphabets.reduce((max, current) => 
                current.toLowerCase() > max.toLowerCase() ? current : max
            );
            highest_alphabet = [highest];
        }

        // Prepare response
        const response = {
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highest_alphabet
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: "Internal server error"
        });
    }
});

// GET endpoint /bfhl
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

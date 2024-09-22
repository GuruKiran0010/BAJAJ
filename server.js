// Change all require statements to import
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Set up __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// POST /bfhl route
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    let numbers = [];
    let alphabets = [];
    let highestLowercaseAlphabet = null;

    // Validate input
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Invalid input format",
        });
    }

    // Separate numbers and alphabets
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && /^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase()) {
                if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
                    highestLowercaseAlphabet = item;
                }
            }
        }
    });

    // Send the response
    res.json({
        is_success: true,
        user_id: "guru_kiran_poka_14012004", // Replace with actual user ID
        email: "gurukiran_poka@srmap.edu.in",
        roll_number: "AP21110010707",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

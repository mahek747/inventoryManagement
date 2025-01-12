const dotenv = require('dotenv');
dotenv.config(); 

const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        const dbUri = process.env.DB_URI; 
        if (!dbUri) {
            throw new Error("Database URI is not defined in .env file.");
        }

        await mongoose.connect(dbUri);

        console.log('Database connected successfully!!!');
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
    }
};

module.exports = { dbConnection };

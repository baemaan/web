const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to handle JSON data and static files
app.use(express.json());
app.use(express.static(__dirname));

// Mock Database (stored in memory)
let listings = [
    {
        name: "Ayesha Khan",
        offers: "Python Data Analysis",
        wants: "Figma UI Design",
        description: "Can teach pandas/numpy basics. Want to learn how to wireframe a mobile app mobile UI."
    },
    {
        name: "Zayn Malik",
        offers: "Graphic Design",
        wants: "React Basics",
        description: "Expert in Photoshop and Illustrator. Looking for someone to explain React components and props."
    }
];

// 1. API Route: Get all skill swap listings
app.get('/api/swaps', (req, res) => {
    res.json(listings);
});

// 2. API Route: Create a new skill swap listing
app.post('/api/swaps', (req, res) => {
    const { name, offers, wants, description } = req.body;

    // Basic validation
    if (!name || !offers || !wants || !description) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const newListing = { name, offers, wants, description };
    listings.unshift(newListing); // Add new post to the beginning of our array

    res.status(201).json({ message: "Listing added successfully!", listing: newListing });
});

// Serve frontend page on landing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
// This tells the server to stay open and listen for visitors
app.listen(PORT, () => {
    console.log(`🚀 SkillSwap server running at http://localhost:${PORT}`);
});
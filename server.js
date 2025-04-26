const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;
const destinationDir = "D:/ekua";

// Enable CORS so other devices can access the server
app.use(cors());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure "uploads" folder exists
const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage });

// Upload route
app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

const copyFiles = () => {
    try{
    const files = fs.readdirSync(uploadDir); 
    files.forEach(file => {
        const sourcePath = path.join(uploadDir, file);
        const destPath = path.join(destinationDir, file);

        if (!fs.existsSync(destPath)) {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`Copied ${file} to ${destinationDir}`);
        } else {
            console.log(`File ${file} already exists at destination.`);
        }
        });
    }
catch(error){}
};

// Run the file copying function periodically (every 10 minutes)
setInterval(copyFiles, 60000); // 600000 ms = 10 minutes

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

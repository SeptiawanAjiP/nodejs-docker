const express = require("express");
const pool = require("./src/config/db");
const app = express();
const PORT = process.env.PORT || 3010;

app.use(express.json());

// Endpoint untuk mendapatkan semua user
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json({
      success: true,
      data: rows,
      message: 'Users retrieved successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error: error.message
    });
  }
});

// Endpoint untuk membuat user baru
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required"
      });
    }
    
    const [result] = await pool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    
    res.status(201).json({
      success: true,
      data: {
        id: result.insertId,
        name,
        email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message
    });
  }
});

// Endpoint status API
app.get("/api", (req, res) => {
  res.json({
    message: "API is running with MySQL",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
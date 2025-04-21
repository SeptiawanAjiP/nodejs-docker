const express = require("express");
const pool = require("./db");
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
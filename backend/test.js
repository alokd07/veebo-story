const jwt = require("jsonwebtoken");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2Q0ZThiMzEzYWY0N2E4NGVjNjdmYTEiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNzQyMDA4NjM3fQ.CaeNN-kjeJDRUqgpdHiz7rQjnNGUP4biwS6Pob3Wbik"; // Replace with the token from login
const secret = "mysecretkey"; // Ensure this matches JWT_SECRET

try {
  const decoded = jwt.verify(token, secret);
  console.log("Token is valid:", decoded);
} catch (err) {
  console.error("Invalid token:", err.message);
}

const express = require("express");
const dotenv = require("dotenv");
const { dbConnection } = require("./database/db");  
const userRoute = require("./routes/user.route");  
// const bookRoute = require("./routes/book.route");  
// const borrowRoute = require("./routes/borrow.route");  

dotenv.config();  

const app = express();  

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  
  
app.use("/user", userRoute);  
// app.use("/book", bookRoute);  
// app.use("/borrow", borrowRoute);  

dbConnection();  

const PORT = process.env.PORT || 8000; 
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

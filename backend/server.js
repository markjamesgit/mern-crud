import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url'; 
import { dirname } from 'path';

import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

app.use("/api/products", productRoutes);

// ✅ Safe production setup
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

}

console.log("Mongo URI:", process.env.MONGO_URI);

app.listen(PORT, () => {
    connectDB();
    console.log(`🚀 Server started at http://localhost:${PORT}`);
});

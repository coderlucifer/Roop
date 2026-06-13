import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "@prisma/client";
import authRoutes from "./routes/auth.js";
import paymentRoutes from "./routes/payment.js";
const { PrismaClient } = pkg;

dotenv.config();

const app = express();
const prisma = new PrismaClient({});
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get a single product by ID
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { productId: id }
    });
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    res.json(product);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Basic Route
app.get("/", (req, res) => {
  res.send("Roop API is running...");
});

// Start Server only locally (Vercel will import the app instead of starting it)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

// Export the app for Vercel Serverless
export default app;

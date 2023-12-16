// import express from "express";
// import mongoose from "mongoose";
// import Product from "./models/productModej.js";

// const app = express();
// app.use(express.json());

// const uri =
//   "mongodb+srv://admin:admin@cluster0.cabehnw.mongodb.net/?retryWrites=true&w=majority";

// // routes
// app.get("/products", async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.get("/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post("/products", async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(200).json(product);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.error });
//   }
// });

// app.put("/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByIdAndUpdate(id, req.body);

//     if (!product) {
//       return res
//         .status(404)
//         .json({ message: `cannot find any product with id ${id}` });
//     }

//     const updatedProduct = await Product.findById(id);

//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.delete("/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await Product.findByIdAndDelete(id);

//     if (!product) {
//       return res
//         .status(404)
//         .json({ message: `Cannot find product with id ${id}` });
//     }
//     res.status(200).json({ message: `Product with id ${id} deleted` });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.listen(3000, () => {
//   console.log("Server started");
// });

// mongoose.set("strictQuery");
// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log("Connected to Mongodb");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// importing
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModej.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const uri = process.env.URI;

const app = express();
app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with id ${id} not found` });
    }

    const updatedProduct = await Product.findById(id);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: `Product with id ${id} not found`,
      });
    }

    res
      .status(200)
      .json({ message: `Product with id ${id} deleted succesfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// listen
app.listen(PORT, () => {
  console.log(`Server listening at Port: ${PORT}`);
});

// mongo connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((error) => {
    console.log(error);
  });

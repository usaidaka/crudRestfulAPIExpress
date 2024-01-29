const Router = require("express").Router();
const productHelper = require("../helpers/productHelper");
const validationHelper = require("../helpers/validationHelper");

const fileName = "server/api/user.js";

const productList = async (req, res) => {
  const { title, rating, stock, brand } = req.query;

  try {
    let response = await productHelper.getProductList();

    if (title && rating && stock && brand) {
      response = response.filter((product) => {
        return (
          product.title.startsWith(title) &&
          String(product.rating).startsWith(rating[0]) &&
          product.stock >= Number(stock) &&
          product.brand.startsWith(brand)
        );
      });
    } else if (title && rating && stock) {
      response = response.filter((product) => {
        return (
          product.title.startsWith(title) &&
          String(product.rating).startsWith(rating[0]) &&
          product.stock >= Number(stock)
        );
      });
    } else if (title && rating) {
      response = response.filter((product) => {
        return (
          product.title.startsWith(title) &&
          String(product.rating).startsWith(rating[0])
        );
      });
    } else if (rating && stock && brand) {
      response = response.filter((product) => {
        return (
          String(product.rating).startsWith(rating[0]) &&
          product.stock >= Number(stock) &&
          product.brand.startsWith(brand)
        );
      });
    } else if (rating && stock) {
      response = response.filter((product) => {
        return (
          String(product.rating).startsWith(rating[0]) &&
          product.stock >= Number(stock)
        );
      });
    } else if (rating && brand) {
      response = response.filter((product) => {
        return (
          String(product.rating).startsWith(rating[0]) &&
          product.brand.startsWith(brand)
        );
      });
    } else if (stock && brand) {
      response = response.filter((product) => {
        return (
          product.stock >= Number(stock) && product.brand.startsWith(brand)
        );
      });
    } else if (title && stock) {
      response = response.filter((product) => {
        return (
          product.title.startsWith(title) && product.stock >= Number(stock)
        );
      });
    } else if (title && brand) {
      response = response.filter((product) => {
        return (
          product.title.startsWith(title) && product.brand.startsWith(brand)
        );
      });
    } else if (title) {
      response = response.filter((product) => {
        return product.title.startsWith(title);
      });
    } else if (rating) {
      response = response.filter((product) => {
        return String(product.rating).startsWith(rating[0]);
      });
    } else if (stock) {
      response = response.filter((product) => {
        return product.stock >= Number(stock);
      });
    } else if (brand) {
      response = response.filter((product) => {
        return product.brand.startsWith(brand);
      });
    }
    return res.json({
      ok: true,
      message: "retrieve product successful",
      response,
    });
  } catch (error) {
    console.log([fileName, "user list", "ERROR", { info: `${error}` }]);
    return res.status(500).json(error);
  }
};

const productById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await productHelper.getProductById(id);
    if (!response) {
      return res
        .status(404)
        .json({ ok: false, message: "Product not found", response: [] });
    }
    return res.json({
      ok: true,
      message: "retrieve product by ID successful",
      response,
    });
  } catch (error) {
    console.log([fileName, "product by id", "ERROR", { info: `${error}` }]);
    return res.status(500).json(error);
  }
};

const postProduct = async (req, res) => {
  try {
    const productData = req.body;
    validationHelper.productListValidation(productData);

    let latest_id = await productHelper.getProductList();
    latest_id = latest_id[latest_id.length - 1].id + 1;

    const response = await productHelper.createProduct(productData, latest_id);

    return res.status(201).json({
      ok: true,
      message: "create product successful",
      response,
    });
  } catch (error) {
    console.log([fileName, "post product", "ERROR", { info: `${error}` }]);
    return res.status(500).json(error);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const isProductExist = await productHelper.getProductById(id);

    if (!isProductExist) {
      return res.status(404).json({ ok: false, message: "Product not found" });
    }

    const response = await productHelper.removeProduct(id);
    return res.status(202).json({
      ok: true,
      message: "delete product successful",
      response,
    });
  } catch (error) {
    console.log([fileName, "delete product", "ERROR", { info: `${error}` }]);
    return res.status(500).json(error);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;

  try {
    validationHelper.productListUpdateValidation(productData);

    const response = await productHelper.reNewProduct(productData, id);

    res.status(201).json({
      ok: true,
      message: "product updated",
      id,
      response: productData,
    });
  } catch (error) {
    console.log([fileName, "update product", "ERROR", { info: `${error}` }]);
    return res.status(500).json(error);
  }
};

Router.get("/product-list", productList);
Router.get("/product-list/:id", productById);
Router.post("/product", postProduct);
Router.delete("/product/:id", deleteProduct);
Router.patch("/product/:id", updateProduct);

module.exports = Router;

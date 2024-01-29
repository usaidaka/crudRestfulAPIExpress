const fs = require("fs");

const dirFile = `${__dirname}/../../data/db.json`;

const getProductList = async () => {
  const data = fs.readFileSync(dirFile);
  return JSON.parse(data);
};

const getProductById = async (id) => {
  const productData = await getProductList();

  const result = productData.find(
    (property) => String(property.id) === String(id)
  );

  return result;
};

const createProduct = async (
  {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
  },
  latest_id
) => {
  const payload = {
    id: latest_id,
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
  };

  let productData = await getProductList();
  productData.push(payload);

  productData = JSON.stringify(productData);
  const result = fs.writeFileSync(dirFile, productData);
  return payload;
};

const removeProduct = async (id) => {
  let productData = await getProductList();
  productData = productData.filter(
    (product) => String(product.id) !== String(id)
  );

  productData = JSON.stringify(productData);
  const result = fs.writeFileSync(dirFile, productData);
  return result;
};

const reNewProduct = async (
  {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
  },
  id
) => {
  let productData = await getProductList();
  let updatedData = productData.map((data) => {
    if (String(data.id) === String(id)) {
      const newData = {
        id: Number(id),
        title: title || data.title,
        description: description || data.description,
        price: price || data.price,
        discountPercentage: discountPercentage || data.discountPercentage,
        rating: rating || data.rating,
        stock: stock || data.stock,
        brand: brand || data.brand,
        category: category || data.category,
      };
      return newData;
    }
    return data;
  });
  updatedData = JSON.stringify(updatedData);
  const result = fs.writeFileSync(dirFile, updatedData);
  return result;
};

module.exports = {
  getProductList,
  getProductById,
  createProduct,
  removeProduct,
  reNewProduct,
};

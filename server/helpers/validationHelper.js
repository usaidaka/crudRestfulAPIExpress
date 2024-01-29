const Joi = require("joi");
const Boom = require("boom");

const productListValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().description("Product title; i.e. Samsung"),
    description: Joi.string()
      .required()
      .description(
        "Product desc; i.e. An sambung mobile which is nothing like samsung"
      ),
    price: Joi.number().required().description("Product name; i.e. 700"),
    discountPercentage: Joi.number()
      .required()
      .description("Product discountPercentage; i.e. 83.96"),
    rating: Joi.number().required().description("Product rating; i.e.5.00"),
    stock: Joi.number().required().description("Product stock; i.e. 10"),
    brand: Joi.string().required().description("Product brand; i.e. Samsung"),
    category: Joi.string()
      .required()
      .description("Product category; i.e. smartphones"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const productListUpdateValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().optional().description("Product title; i.e. Samsung"),
    description: Joi.string()
      .optional()
      .description(
        "Product desc; i.e. An sambung mobile which is nothing like samsung"
      ),
    price: Joi.number().optional().description("Product name; i.e. 700"),
    discountPercentage: Joi.number()
      .optional()
      .description("Product discountPercentage; i.e. 83.96"),
    rating: Joi.number().optional().description("Product rating; i.e.5.00"),
    stock: Joi.number().optional().description("Product stock; i.e. 10"),
    brand: Joi.string().optional().description("Product brand; i.e. Samsung"),
    category: Joi.string()
      .optional()
      .description("Product category; i.e. smartphones"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  productListValidation,
  productListUpdateValidation,
};

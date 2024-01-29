const Request = require("supertest");
const QS = require("qs");
const _ = require("lodash");

const generalHelper = require("../../server/helpers/generalHelper");
const productPlugin = require("../../server/api/product");

let apiUrl;
let server;
let query;
let id;

const product1 = {
  title: "Mito",
  description: "An Mito mobile which is nothing like Mito",
  price: 100,
  discountPercentage: 10.96,
  rating: 1.0,
  stock: 5,
  brand: "Mito",
  category: "Qwerty",
};

describe("Product Json", () => {
  beforeAll(() => {
    server = generalHelper.createTestServer("/api", productPlugin);
  });

  afterAll(async () => {
    await server.close();
  });

  describe("Product", () => {
    beforeEach(() => {
      apiUrl = "/api/product-list";
      query = {
        id: "1",
      };
    });

    test("Should return 200: Get All Product", async () => {
      await Request(server)
        .get(apiUrl)
        .expect(200)
        .then((res) => {
          expect(!_.isEmpty(res.body?.response)).toBeTruthy();
          expect(res.body?.response?.length).toBe(12);
          const iPhone9 = _.find(
            res.body?.response,
            (item) => item.title.toLowerCase() === "iphone 9"
          );
          expect(!_.isEmpty(iPhone9)).toBeTruthy();
        });
    });

    test("Should Return 200: Get Specific Product with Result", async () => {
      await Request(server)
        .get(`${apiUrl}/${query.id}`)
        .expect(200)
        .then((res) => {
          console.log(Array(res.body?.response).length, "<<<>>>ARRAY");
          expect(!_.isEmpty(res.body?.response)).toBeTruthy();
          expect(Array(res.body?.response).length).toBe(1);
          const iPhone9 = _.find(
            res.body,
            (item) => item.title?.toLowerCase() === "iphone 9"
          );

          const iPhoneX = _.find(
            res.body,
            (item) => item.title?.toLowerCase() === "iphone x"
          );
          expect(!_.isEmpty(iPhone9)).toBeTruthy();
          expect(_.isEmpty(iPhoneX)).toBeTruthy();
        });
    });

    test("Should Return 200: Get Specific Product without Result", async () => {
      query.id = "100";
      await Request(server)
        .get(`${apiUrl}/${query.id}`)
        .expect(404)
        .then((res) => {
          expect(res.body?.ok).toBe(false);
        });
    });

    test("Should Return 201: Create Product", async () => {
      apiUrl = "/api/product";
      await Request(server)
        .post(`${apiUrl}`)
        .send(product1)
        .expect(201)
        .then((res) => {
          id = res.body?.response?.id;
        });
    });

    test("Should Return 201: Update Product", async () => {
      apiUrl = `/api/product`;
      await Request(server)
        .patch(`${apiUrl}/${id}`)
        .send(product1)
        .expect(201)
        .then((res) => {
          id = res.body?.id;
        });
    });
    test("Should Return 202: Delete Product", async () => {
      apiUrl = `/api/product`;
      await Request(server)
        .delete(`${apiUrl}/${id}`)
        .send(product1)
        .expect(202)
        .then((res) => {
          id = res.body?.response?.id;
        });
    });
  });
});

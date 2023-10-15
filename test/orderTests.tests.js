import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Order API", () => {
  // Test Case 1: Placing a valid order
  it("Should place a valid order", async (done) => {
    this.timeout(5000); // Increase the timeout limit to 5 seconds

    const response = await chai.request(app).post("/api/orders").send({
      productId: "use_actual_product_Id", // Replace with an actual product ID
      quantity: 1,
    });

    expect(response).to.have.status(200);
    done();
  });

  // Test Case 2: Failing to place an order with an invalid product ID
  it("Should fail to place an order with invalid product ID", async (done) => {
    this.timeout(5000);

    const response = await chai.request(app).post("/api/orders").send({
      productId: "use_Invalid_Product_Id", // An invalid product ID
      quantity: 5,
    });

    expect(response).to.have.status(500);
    expect(response.body)
      .to.have.property("message")
      .equal("Product unavailable");
    done();
  });

  // Test Case 3: Failing to place an order with insufficient product quantity
  it("Should fail to place an order with insufficient product quantity", async (done) => {
    this.timeout(5000);

    const response = await chai.request(app).post("/api/orders").send({
      productId: "use_valid_Product_Id", // Replace with an actual product ID
      quantity: 1000,
    });

    expect(response).to.have.status(500);
    expect(response.body)
      .to.have.property("message")
      .equal("Product unavailable");
    done();
  });

  // Test Case 4: Failing to place an order with negative quantity
  it("Should fail to place an order with negative quantity", async (done) => {
    this.timeout(5000);

    const response = await chai.request(app).post("/api/orders").send({
      productId: "use_valid_Product_Id", // Replace with an actual product ID
      quantity: -5,
    });

    expect(response).to.have.status(500);
    expect(response.body)
      .to.have.property("message")
      .equal("Product unavailable");
    done();
  });

  // Test Case 5: Cancelling an order
  it("Should cancel an order", async (done) => {
    this.timeout(5000);

    const response = await chai
      .request(app)
      .delete("/api/orders/use_valid_order_Id"); // Replace with an actual order ID

    expect(response).to.have.status(200);
    expect(response.body).to.have.property("message").equal("Order cancelled");
    done();
  });
});

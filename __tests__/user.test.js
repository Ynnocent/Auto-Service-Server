const request = require("supertest");
const authController = require("../controllers/authController");

const testURL = "http://localhost:5050/";

describe("Users controller", () => {
  test("fetch all users ", async () => {
    const response = await request(testURL).get("user/");
    expect(response.statusCode).toBe(200);
  });

  test("create new customer user", async () => {
    const newUser = {
      user_fname: "test",
      user_lname: "test",
      user_email: "tugrp@example.com",
      user_password: "1289823",
      user_type: "CUSTOMER",
    };

    const response = await request(testURL)
      .post("customer/signup")
      .send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("user_fname");
    expect(response.body).toHaveProperty("user_lname");
    expect(response.body).toHaveProperty("user_email");
    expect(response.body).toHaveProperty("user_password");
    expect(response.body).toHaveProperty("user_type");

    const deletedTest = await request(testURL).post("user/del");
    expect(deletedTest.statusCode).toBe(200);
  });
});

describe("Customer Controller", () => {
  test("Create car", async () => {
    const userDetails = {
      user_email: "plucenaynno@gmail.com",
      user_password: "1289823",
    };

    const carData = {
      car_name: "Toyota Corolla",
      car_type: "Sedan",
      car_color: "White",
      car_model: "Toyota",
      car_year: "2020",
      car_price: 2000,
      car_damage_description: "TEST DESCRIPTION",
    };
    const login = await request(testURL)
      .post("user/login")
      .send(userDetails);

    const response = await request(testURL)
      .post("customer/carupload")
      .send(carData);
    expect(response.statusCode).toBe(200);
  });
});

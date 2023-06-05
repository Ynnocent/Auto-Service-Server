const request = require("supertest");
const authController = require("../controllers/authController");

describe('Test Users controller', () => {
    test('fetch all users ', async () => {
        const response = await request("http://localhost:5050/").get("user/");
        expect(response.statusCode).toBe(200);
    });

    test('create new customer user', async () => {
        const newUser = {
            user_fname: "test",
            user_lname: "test",
            user_email: "tugrp@example.com",
            user_password: "1289823",
            user_type: "CUSTOMER"
        }

        const response = await request("http://localhost:5050/").post("user/post").send(newUser);
        console.log(response.body)
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("user_fname");
        expect(response.body).toHaveProperty("user_lname");
        expect(response.body).toHaveProperty("user_email");
        expect(response.body).toHaveProperty("user_password");
        expect(response.body).toHaveProperty("user_type");

        const deletedTest = await request(global.url).post("user/del");
        console.log(deletedTest.body);
        expect(deletedTest.statusCode).toBe(200);
    });
});
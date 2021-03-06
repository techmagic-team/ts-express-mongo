import request from 'supertest';
import faker from 'faker';
import {Application} from "express";
import App from "../src/app";

let app: Application;

describe('User Routes', () => {
    beforeAll(async () => {
       app = await App.getApplication();
    });
    describe("POST /users", () => {
        it('should create user', async () => {
            const result = await request(app).post("/users").send({email: faker.internet.email()});
            console.log(result.body);
            expect(result.status).toEqual(201);
        });
        it("should throw validation error 400", async () => {
            const result = await request(app).post("/users").send({email: faker.name.findName()});
            expect(result.status).toEqual(400);
        });
    });
    describe("GET /users", () => {
        it("should return 200", async () => {
            const result = await request(app).get("/users");
            expect(result.status).toEqual(200);
            expect(result.body).toBeInstanceOf(Array);
        });
    });
});

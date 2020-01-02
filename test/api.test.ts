import request from 'supertest';
import App from "../src/app";
import {Application} from "express";
let server: Application;

describe("GET /login", () => {
    beforeAll(async () => {
        server = await App.getApplication();
    });
    it("should return 404 not found", () => {
        return request(server).get("/login")
            .expect(404);
    });
});

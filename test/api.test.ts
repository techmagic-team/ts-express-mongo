import request from 'supertest';
import app from "../src/app";

describe("GET /login", () => {
    it("should return 404 not found", () => {
        return request(app).get("/login")
            .expect(404);
    });
});

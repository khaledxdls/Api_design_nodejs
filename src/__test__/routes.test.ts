import supertest from "supertest";
import app from "../server";
describe("GET /", () => {
    it("should return 200 OK", async () => {
        const result = await supertest(app).get("/");
        expect(result.status).toBe(200);
    });
    it("should return 'Hello, world!'", async () => {
        const result = await supertest(app).get("/");
        expect(result.text).toBe("Hello, world!");
    });
});
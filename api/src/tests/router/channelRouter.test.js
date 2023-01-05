const request = require("supertest");
const app = require("../../index");

describe("GET /channel", () => {
    const newChannel = {
        name: "Channel 123"
    }
    beforeAll(async () => {
        // set up the channel
        await request(app).post("/channel").send(newChannel);
    })
    afterAll(async () => {
        await request(app).delete(`/channel/${newChannel.id}`)
    })
    test("It should return a 200 response and channels name",
        async () => {
            const response = await request(app).get("/channel");
            expect(response.statusCode).toBe(200);
            expect(response.body.length >= 1).toBe(true);
        });
});
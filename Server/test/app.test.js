const request = require("supertest");

const app = require("../app");

describe("API", () => {

    let api;

    beforeAll(() => {
        api = app.listen(3030);
    })

    afterAll(() => {
        api.close();
    })

    it("Responds to a GET reequest at / with a 200 status", () => {
        request(api).get("/").expect(200)
    })
})
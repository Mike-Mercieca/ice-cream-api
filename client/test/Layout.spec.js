/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "../index.html"));

describe("Index page", () => {

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    test("It has an appropriate heading", () => {
        const heading = document.querySelector("h1");
        
        expect(heading).toBeTruthy();
        expect(heading.textContent).toEqual("Welcome to the Ice Cream Factory!")
    })

})
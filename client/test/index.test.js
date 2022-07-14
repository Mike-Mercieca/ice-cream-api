/**
 * @jest-environment jsdom
 */

fetch = require('jest-fetch-mock');

const {
    makeOrderElement,
    makeFlavourOption,
    orderIceCream,
    getAvailableFlavours, 
    updateFlavourDropdown
} = require("../assets/scripts/index");

describe("makeOrderElement", () => {

    test("It returns a li element", () => {
        
        const li = makeOrderElement();

        expect(li).toBeInstanceOf(HTMLLIElement);
    })
})

describe("orderIceCream", () => {

    beforeEach(() => {
        document.documentElement.innerHTML = "<ul id='orders'></ul>"
    })

    test("It adds a li element to the holder with the correct content", () => {

        const mockEvent = {
            preventDefault: jest.fn(),
            target: {
                flavour: {
                    value: "strawberry"
                },
                scoops: {
                    value: 2
                }
            }
        }
        
        // Call the function with the mock event as input
        orderIceCream(mockEvent);

        // Check on the document
        const orders = document.getElementById("orders");

        expect(orders.children.length).toEqual(1);
        expect(orders.children[0]).toBeInstanceOf(HTMLLIElement);
        expect(orders.children[0].textContent).toEqual("2 scoop(s) of strawberry");


    }) 

})

describe("getAvailableFlavours", () => {

    describe("It handles successful requests", () => {

        beforeEach(() => {
            fetch.mockResponseOnce(JSON.stringify({
                flavours: [1, 2, 3]
            }))
        })
    
        test("It makes a call to the fetch API", () => {
            getAvailableFlavours();
    
            expect(fetch).toHaveBeenCalled();
            expect(fetch).toHaveBeenCalledTimes(1);
        })
    
        test("It returns a list of flavours", async () => {
            
            const result = await getAvailableFlavours();
    
            expect(result instanceof Array);
            expect(result.length).toEqual(3);
    
        })
    })

    describe("It handles failed requests", () => {

        test("It throws an error when the request fails", () => {

            fetch.mockRejectOnce("Server down!");

            expect(getAvailableFlavours()).rejects.toEqual("Unable to access flavour list!")
        })

    })

   
})
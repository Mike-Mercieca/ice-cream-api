function makeOrderElement(flavour, scoops) {
    const li = document.createElement("li");
    li.textContent = `${scoops} scoop(s) of ${flavour}`;

    return li;
}

function makeFlavourOption(flavour) {
    const opt = document.createElement("option");
    opt.value = flavour;
    opt.textContent = flavour.charAt(0).toUpperCase() + flavour.slice(1);

    return opt;
}

function orderIceCream(e) {

    e.preventDefault();

    const form = e.target;

    const elem = makeOrderElement(form.flavour.value, form.scoops.value);

    const orders = document.getElementById("orders");
    
    orders.appendChild(elem);

}

async function getAvailableFlavours() {

    try {
        const response = await fetch("http://localhost:3000/flavours");
        const data = await response.json();
        return data["flavours"];
    } catch (error) {
        console.log(error);
        return [];
    }
    
}

async function updateFlavourDropdown() {

    const flavours = await getAvailableFlavours();

    const options = flavours.map(o => makeFlavourOption(o));

    const dropdown = document.getElementById("flavour");

    dropdown.replaceChildren(...options);
}
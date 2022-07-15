//Import the app
const app = require("./app");


// Start the server
const port = 3000;

app.listen(port, () => {
    console.log(`Started listening on port ${port}`);
})
const express = require("express")
//console.log(express);
const app = express();
const port = 8000;

// IMPORT FAKER API
const faker = require("@faker-js/faker");


//----------------------------- MIDDLEWARE --------------------------
// make sure these lines are above any app.get or app.post code blocks
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





//------------------- TESTING SERVER STARTUP ----------------------
console.log("hello server!!!");



//--------------------  BUILD CLASS COMPONENTS  ---------------------

//------------------- USER CLASS ------------------
class User {
    constructor() {
        this.Id = faker.datatype.uuid();
        this.First_Name = faker.name.firstName();
        this.Last_Name = faker.name.lastName();
        this.Phone = faker.phone.phoneNumber();
        this.Email = faker.internet.email();
        this.Password = faker.internet.password();
    }
}
// Log New User to console >>> test random User object keys and values from faker api
// console.log(new User());


//------------------ COMPANY CLASS -----------------
class Company {
    constructor() {
        this.Id = faker.datatype.uuid();
        this.Company_Name = faker.company.companyName(); 
        this.Address_Street = faker.address.streetAddress();
        this.City = faker.address.city();
        this.State = faker.address.state();
        this.Zip_Code = faker.address.zipCode();
        this.Country = faker.address.country();
    }
}
// Log New Company to console >>> test random Company object keys and values from faker api
// console.log(new Company());







//---------------------------  ROUTING >>> FAKER API   -----------------------

//-------------- NEW USER ---------------
app.get("/api/users/new", (req, res) => {
    // Log New User to console to
    console.log(new User());
    
    // Respond from faker api with new random user from class info above
    res.json(new User());
})


//-------------- NEW COMPANY ---------------
app.get("/api/companies/new", (req, res) => {
    // Log New User to test route and see res from server
    console.log(new Company());
    
    // Respond from faker api with new random user from class info above
    res.json(new Company());
})


//---------- NEW USER & NEW COMPANY ----------
app.get("/api/user/company", (req, res) => {
    // Log New User AND New Company to test route and see res from server
    console.log(new User());
    console.log(new Company());

    // Respond from faker api with new random user & company from class info above
    res.json([new User(), new Company()]);
})










//---------------------- INITIAL PRACTICE -------------------------- 

// Hardcoded User Objects for initial practice
const users = [
    { firstName: "Reimu", lastName: "Hakurei" },
    { firstName: "Marisa", lastName: "Kirisame" },
    { firstName: "Sanae", lastName: "Kochiya" },
    { firstName: "Sakuya", lastName: "Izayoi" },
    { firstName: "Momiji", lastName: "Inubashiri" }
];


//------------------------ ROUTING PRACTICE ---------------------- 

// GET api server route 
app.get("/api", (req, res) => {
    console.log("Hello from server!!!");
})

// GET all users from users array above
app.get("/api/users", (req, res) => {
    res.json( users );
});

// GET response from server and send to front-end/client
app.get("/api/hello", (req, res) => {
    res.send("hello from server.js");
    // const myRes = {
    //     status: "cool",
    //     weather: "sunny",
    //     numbers: [1, 2, 3]
    // }
    // res.json(myRes)
})



// -----------------  Access URL Variables >>>> Pracitice  ----------------
app.get("/api/users/:id", (req, res) => {
    // console.log(req); >>> // logs response from server to console based on url var
    // console.log(req.params); >>> // logs response from server with url var params >>> Ex: {id: 1}
    // console.log(req.params.id); >>> // logs id number only in console >>> retrieved from server response >>> Ex: 1
    const { id } = req.params
    console.log("this is id ---> ", id);

    res.json({
        your_id: req.params.id,
        status: 200,
        user: users[id]
    })
})




// -----------------------  POST REQUEST TO SERVER  -------------------
app.post("/api/users", (req, res) => {
    // req.body will contian the form data from Postman or from React
    console.log(req.body);


    // Push req.body object from post request into users array
    users.push(req.body);

    // Send JSON Response back from client confirming post data was sent from server
    res.json({ status: "ok" })
})









//-------------------ALWAYS AT THE END OF THE SERVER FILE------------------
app.listen(port, () => console.log(`>>>> Server started 
on port ${port} and is listening for REQuests to RESpond to <<<<`))
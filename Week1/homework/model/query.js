const yargs = require("yargs");
const fs = require("fs");
const path = require("path");

const countryData = [
  [null, "Sweden", "SE", "Europe", 9900000],
  [null, "Finland", "FI", "Europe", 5500000],
  [null, "Lebanon", "LE", "Asia", 4000000],
  [null, "Egypt", "EG", "Africa", 99000000],
  [null, "Russia", "RS", "Asia", 142000000]
];
const countryQuery =
  "INSERT INTO country (ID, Name, Country_Code, Continent, Population) VALUES ?";
const cityData = [
  [null, "Stockholm", "SE", 960000],
  [null, "Helsinki", "FI", 631696],
  [null, "Beirut", "LE", 2200000],
  [null, "Cairo", "EG", 42000000],
  [null, "Moscow", "RS", 11920000]
];
const cityQuery =
  "INSERT INTO city (ID, Name,Country_Code, Population) VALUES ?";
function commandFunc(con) {
  var argv = yargs
    .command("install", "Install world.sql with tables and data")
    .command("new_database", "Create the new database with name world")
    .command(
      "new_table",
      "Create the new tables country & city for world database"
    )
    .command("insert_data", "Insert some data into both table")
    .command(
      "countries",
      "list of countries with population more than 8 million"
    )
    .command("land", "list of Countires with land in their name")
    .command(
      "cities",
      "list of cities with population in between 500,000 & 1 million"
    )
    .command("europe", "list of Countries on the continent Europe")
    .command(
      "desc_surface",
      "list of Countries in the descending order of their surface area"
    )
    .command("Netherland", "list of all cities in Netherland")
    .command("Rotterdam", "population of Rotterdam")
    .command("desc_10", "10 countries order by their surface area")
    .command("populated_cities", "10 most populated cities")
    .command("world_population", "show the total population of world")
    .help().argv;

  let command = argv._[0];

  if (command === "install") {
    let queries = fs
      .readFileSync(path.join(__dirname, "./world.sql"))
      .toString();
    con.query(queries, err => {
      if (err) throw err;
      console.log("Successfully Imported!!");
    });
  } else if (command === "new_database") {
    console.log("=========================");
    console.log("Create the new database with name world");
    console.log("=========================");
    con.query("CREATE DATABASE IF NOT EXISTS world", (error, result) => {
      if (error) throw error;
      console.log("Database created !!!");
    });
  } else if (command === "new_table") {
    con.query("USE world", err => {
      if (err) throw err;
    });
    console.log("=========================");
    console.log("Create the new country & city table in the world database");
    console.log("=========================");
    con.query(
      "CREATE TABLE if not exists country (ID int NOT NULL AUTO_INCREMENT, Name varchar(50), Country_Code varchar(52), Continent varchar(52), Population INT, PRIMARY KEY(ID))",
      (error, result) => {
        if (error) throw error;
        console.log("Country Table created !!!");
      }
    );
    con.query(
      "CREATE TABLE if not exists city (ID int NOT NULL AUTO_INCREMENT, Name varchar(50), Country_Code varchar(52), Population INT, PRIMARY KEY(ID))",
      (error, result) => {
        if (error) throw error;
        console.log("====================================");
        console.log("City Table created !!!");
      }
    );
  } else if (command === "insert_data") {
    con.query("USE world", err => {
      if (err) throw err;
      console.log("Database changed to World");
    });
    con.query(countryQuery, [countryData], err => {
      if (err) throw err;
      console.log("====================================");
      console.log("Country Data insert successful !!!");
    });
    con.query(cityQuery, [cityData], err => {
      if (err) throw err;
      console.log("====================================");
      console.log("City data insert successful !!!");
    });
  } else if (command === "countries") {
    console.log("=========================");
    console.log("countries with population more than 8 million");
    console.log("=========================");
    con.query(
      "SELECT * from country WHERE Population > 8000000",
      (error, result) => {
        if (error) throw error;
        for (let i in result) {
          console.log(
            `${result[i].Name} population is ${result[i].Population}`
          );
          console.log("-----------------------------------------------");
        }
        console.log("Total Countries",result.length);
      }
    );
  } else if (command === "land") {
    con.query(
      'SELECT Name FROM country WHERE Name LIKE "%land%"',
      (error, result) => {
        if (error) throw error;
        console.log("=========================");
        console.log("Countires with land in their name");
        console.log("=========================");
        for (let i in result) {
          console.log(`${result[i].Name}`);
          console.log("-----------------------------------------------");
        }
        console.log("Total Countries",result.length);
      }
    );
  } else if (command === "cities") {
    con.query(
      "SELECT Name FROM country WHERE Population BETWEEN 500000 AND 1000000",
      (error, result) => {
        console.log("=========================");
        console.log("cities with population in between 500,000 & 1 million");
        console.log("=========================");
        if (error) throw error;
        for (let i in result) {
          console.log(`${result[i].Name}`);
          console.log("-----------------------------------------------");
        }
        
        console.log("Total Cities",result.length);
      }
    );
  } else if (command === "europe") {
    con.query(
      'SELECT Name FROM country WHERE continent = "Europe"',
      (error, result) => {
        console.log("=========================");
        console.log("Countries on the continent Europe");
        console.log("=========================");
        if (error) throw error;
        for (let i in result) {
          console.log(`${result[i].Name}`);
        }
        console.log("-----------------------------------------------");
      }
    );
  } else if (command === "desc_surface") {
    con.query(
      "SELECT Name FROM country ORDER BY SurfaceArea DESC",
      (error, result) => {
        console.log("=========================");
        console.log("Countries in the descending order of their surface area");
        console.log("=========================");
        if (error) throw error;
        for (let i in result) {
          console.log(
            `${result[i].Name} surface area ${result[i].SurfaceArea}`
          );
          console.log("-----------------------------------------------");
        }
      }
    );
  } else if (command === "Netherland") {
    con.query(
      'SELECT Name FROM city WHERE CountryCode = "NLD"',
      (error, result) => {
        console.log("=========================");
        console.log("All cities in the Netherland");
        console.log("=========================");
        if (error) throw error;
        for (let i in result) {
          console.log(`${result[i].Name}`);
          console.log("-----------------------------------------------");
        }
      }
    );
  } else if (command === "Rotterdam") {
    con.query(
      'SELECT Population FROM city WHERE Name = "Rotterdam"',
      (error, result) => {
        if (error) throw error;
        console.log("=========================");

        console.log(
          `Population of Rotterdam: ${JSON.stringify(result[0].Population)}`
        );
        console.log("-----------------------------------------------");
      }
    );
  } else if (command === "desc_10") {
    con.query(
      "SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10",
      (error, result) => {
        console.log("=========================");
        console.log("10 countries order by their surface area");
        console.log("=========================");
        if (error) throw error;
        for (let i in result) {
          console.log(
            `${result[i].Name} surface area is ${result[i].SurfaceArea}`
          );
          console.log("-----------------------------------------------");
        }
      }
    );
  } else if (command === "populated_cities") {
    con.query(
      "SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10",
      (error, result) => {
        console.log("=========================");
        console.log("10 most populated cities");
        console.log("=========================");
        if (error) throw error;
        for (let i in result) {
          console.log(
            `${result[i].Name} population is ${result[i].Population}`
          );
          console.log("-----------------------------------------------");
        }
      }
    );
  } else if (command === "world_population") {
    con.query("SELECT SUM(Population) FROM country", (error, result) => {
      console.log("=========================");
      if (error) throw error;
      console.log(`Total Population of World: ${JSON.stringify(result[0])}`);
      console.log("=========================");
    });
  } else {
    console.log("Invalid Command !!!");
  }
}

module.exports = commandFunc;

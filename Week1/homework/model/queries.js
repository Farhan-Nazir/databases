let dbQueries = [
  {
    link: "/countries",
    query: 'SELECT * from country WHERE Population > 8000000"'
  },
  {
    link: "/cities",
    query: 'SELECT * from country WHERE Population > 8000000"'
  },
  {
    link: "/rotterdam",
    query: 'SELECT * from country WHERE Population > 8000000"'
  },
  {
    link: "/countries",
    query: 'SELECT * from country WHERE Population > 8000000"'
  }
];
function runQuery(con, app, link, query) {
  app.get(link, (req, res) => {
    con.query(query, (error, result) => {
      if (error) throw error;
      for (let i in result) {
        console.log(`${result[i].Name} population is ${result[i].Population}`);
      }
    });

    /* con.query(
      "SELECT country.country_name, region.region_name from country JOIN region ON country.region_id = region.region_id"
    ); */
  });
}

module.exports = queries;

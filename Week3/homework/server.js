var express = require('express');
var bodyParser = require('body-parser');
// const cors = require('cors');
let app = express();

//App routes and endpoints
let appRoutes = require('./routes/approutes');



// //cors
// app.use(cors({origin: 'http://localhost:4200'}));
// app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', appRoutes);

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server is running at ' + PORT);
})

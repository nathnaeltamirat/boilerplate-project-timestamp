// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/",(req,res)=>{
  const d = new Date()
  utc =d.toUTCString()
  unix = d.valueOf()
  res.json({"unix":unix,"utc":utc})
})
// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  let date = req.params.date

    if ( date == ""){
      res.json({"error":"Invalid Date"})  
    }else{
      if (isNaN(date)){

        const d = new Date(date)
        if (d == "Invalid Date"){
          res.json({"error":"Invalid Date"})
        }else{
          utc =d.toUTCString()
          unix = d.valueOf()
          res.json({"unix":unix,"utc":utc})
        }
        } 
      else{
        d = new Date(parseInt(date))
        utc =d.toUTCString()

        res.json({"unix":d,"utc":utc})
      }   
    }
 

});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

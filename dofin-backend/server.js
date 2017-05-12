const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      cors        = require('cors');

const income = require('./routes/income');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use("/income", income);

app.listen(3000 || process.env.PORT, () => {
  console.log(`Server running!`);
})

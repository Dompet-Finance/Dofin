const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      cors        = require('cors');

const income = require('./routes/income');
const dream = require('./routes/dream');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use("/income", income);
app.use("/dream", dream);

app.listen(3001 || process.env.PORT, () => {
  console.log(`Server running!`);
})

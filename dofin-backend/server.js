const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      cors        = require('cors')

const income = require('./routes/income');
const dream = require('./routes/dream');
const expense = require('./routes/expense');
const user = require('./routes/user');

app.use(require('morgan')('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', require('./routes'))
app.use("/income", income);
app.use("/dreams", dream);
app.use("/expenses", expense);
app.use("/users", user);

app.listen(8080 || process.env.PORT, () => {
  console.log(`Server running!`);
})

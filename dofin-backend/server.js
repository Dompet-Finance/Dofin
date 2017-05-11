const express = require('express'),
      app     = express();

app.use("/", (req, res) => {
  res.send("Personal application app")
})


app.listen(8081 || process.env.PORT, () => {
  console.log(`Server running!`);
})

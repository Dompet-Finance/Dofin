const express = require('express'),
      app     = express();

app.use("/", (req, res) => {
  res.send("Personal application app")
})


app.listen(3000 || process.env.PORT, () => {
  console.log(`Server running!`);
})

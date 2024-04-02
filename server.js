const express = require('express');
const app = express();
const PORT = 3000; // You can choose any port number

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
const express = require('express');
const app = express();

var port = process.env.PORT || 3000;

// ROUTES
app.get('/', (req, res) => {
    res.send('McFlens & Co. ft. Emil & Jonte & Maxiboi')
})

app.listen(port, () => {
    console.log(`Server is working on port ${port}`)
})
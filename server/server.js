const express = require('express');
const app = express();

var port = process.env.PORT || 3000;

// ROUTES
app.get('/', (req, res) => {
    res.send('Red Light Chat. ft. Emil & Jonte & Maxiboi & Simme')
})

app.listen(port, () => {
    console.log(`Server is working on port ${port}`)
})
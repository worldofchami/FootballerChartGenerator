const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const { createChart } = require("./shell");

app.listen(port, () => {
    console.log("Listening");
});


app.get('/', (req, res) => {
    res.send("This is strictly a server. You're not supposed to be here!");
});

app.get('/chart/:name', (req, res) => {
    try
    {
        let name = req.params.name;
        name = name.trim();
        createChart(name);

        res.json({
            name,
            ok: true,
            fileName: `plot-${name}.png`
        });
    }

    catch(e)
    {
        console.log(e);
        res.json({
            ok: false
        });
    }
});
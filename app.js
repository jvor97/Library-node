const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');

const app = express();


app.get('/', (req,res) => {
    res.send('Hello from my librabry')
})

app.listen(3000, () => {
    debug(`listening on port 3000 ${chalk.green('3000')}`);
})
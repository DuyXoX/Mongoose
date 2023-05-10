
const express = require('express');
const mongoose = require('mongoose');
// const userRouter = require('./routes/userRoute');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const userController = require('./controller/userController')
const url = "mongodb+srv://duyvmpk:duy123@cluster0.wy2cqmu.mongodb.net/MonggoDB?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.engine('.hbs', expressHandlebars.engine());
app.set('view engine', '.hbs');
app.use(express.json());

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

app.use('/login', userController);


app.use('/user', userController);
app.listen(3000, () => {
    console.log('server is running!')
})

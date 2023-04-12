const express = require('express');
const { ProductRouter } = require('./Routes/ProductRouter');
const { UserRouter } = require('./Routes/UserRoutes');
const app = express();
const session = require('express-session');
const { CartRouter } = require('./Routes/CartRouter');
require('./Config/database')
require('dotenv').config();
const mongoDbSession = require('connect-mongodb-session')(session);
const store = new mongoDbSession({
    uri : process.env.MONGO_URI,
    collection : "sessions",
    sameSite: 'none', 
});

const cors = require('cors');
const Product = require('./Schema/Product');


// app.use(cors({credentials: true, origin: true}));

app.use(cors({credentials: true, origin: 'https://euphonious-yeot-a494ba.netlify.app'}));

  
app.use(session({
    secret : "hello muine",
    resave : false,
    saveUninitialized : false,
    store : store,
}))



app.use(express.json())
app.use('/product', ProductRouter);
app.use('/user', UserRouter)
app.use('/cart', CartRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
})
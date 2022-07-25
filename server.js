const dotenv = require('dotenv');
dotenv.config();
const Express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs');
const passport = require('./helpers/passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('./middleware/morgan');
const app = Express();
const port = process.env.PORT || 3000;

const routerOrders = require('./src/route/Orders');
const routerItems = require('./src/route/Items');
const routerCustomers = require('./src/route/Customers');
const routerAdmin = require('./src/route/Admins');
const routerSellers = require('./src/route/Sellers');
const errorHandler = require('./middleware/errHandler');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan);
app.use(session({
    secret: 'process.env.SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
}))
app.use(Express.json());
app.use(Express.urlencoded({ extended: true, type: 'application/x-www-form-urlencoded' }));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(passport.initialize());
app.use(passport.session());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
        docExpansion: 'none'
    }
}));

app.use('/api/order', routerOrders);
app.use('/api/item', routerItems);
app.use('/api/admin', routerAdmin);
app.use('/api/customer', routerCustomers);
app.use('/api/seller', routerSellers);

// err handler middleware
app.use(errorHandler);

app.listen(port, () => {console.log(`Server is running on port ${port}`);})
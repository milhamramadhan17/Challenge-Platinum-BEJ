const Express = require('express');
const app = Express();
const port = process.env.PORT || 3000;
const routerOrders = require('./src/route/orders');


app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/api/order', routerOrders);

app.listen(port, () => {console.log(`Server is running on port ${port}`);})


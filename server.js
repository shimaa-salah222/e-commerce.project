db = require('./database');
const express = require('express');
const app = express();
const moragn = require("morgan");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require("cors")

dotenv.config();
const PORT = process.env.PORT;

app.use(cors());

app.use(moragn('tiny'));

const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter');
const autherRouer = require('./routers/adminRouter');
const cartRouter = require('./routers/cartRouter')

app.use(bodyParser.json());
app.use(express.json());

app.use('/', userRouter);
app.use('/product', productRouter);
app.use('/admin', autherRouer);
app.use('/cart', cartRouter);

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status).send({
        message: err.message
    })
});

app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
  });



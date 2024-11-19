const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const URL = process.env.URL;


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(URL).then((conn)=>{
    console.log(`Database connected: ${conn.connection.host}` );
  })
  .catch((err)=>{
    console.error(`database error ${err}`);
   process.exit(1);
  })
  }
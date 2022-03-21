const mongoose = require('mongoose');

const connectDB = async () => {
  // try {
  //   const conn = await mongoose.connect(process.env.MONGO_URI, {
  //     useUnifiedTopology: true,
  //     useNewUrlParser: true,
  //     useCreateIndex: true,
  //     useFindAndModify: false
  //   })

  //   console.log(`mongo db connected: ${conn.connection.host}`)
  // } catch (error) {
  //   console.log( `Errorzzz`);
  //   process.exit(1);
  // }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to db')
  } catch (err) {
    console.error('zaza',err)
  }
}

module.exports =  connectDB;
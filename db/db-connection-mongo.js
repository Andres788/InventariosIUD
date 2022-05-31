const mongoose = require("mongoose");

const getConnection = async () => {
  try {
    const url =
      "mongodb://user_db:N9HrYywQULwdG8I4@cluster0-shard-00-00.wf2r1.mongodb.net:27017,cluster0-shard-00-01.wf2r1.mongodb.net:27017,cluster0-shard-00-02.wf2r1.mongodb.net:27017/inventario-project?ssl=true&replicaSet=atlas-40a55a-shard-0&authSource=admin&retryWrites=true&w=majority";

    await mongoose.connect(url);

    console.log("Conexion exitosa");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    getConnection, 
}

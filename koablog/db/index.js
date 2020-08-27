const mongoose = require('mongoose');
const config = require('../config');
class MongoDb{
    static connect(){
        mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.dbName}`, 
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        mongoose.set('useFindAndModify', false)
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', async () => {
          console.log(`链接数据库成功`);
        })
    }
}
module.exports = MongoDb;
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient ; 
let db ;


const MongoConnect = (cb) =>{
  MongoClient.connect('mongodb+srv://tonysrule:jKLKh3bkD5pLbdDx@cluster0.fvc9sga.mongodb.net/shop?retryWrites=true&w=majority')
  .then(result =>{
      db =  result.db();
      cb();
      console.log('Database is connected successfully');
  })
  .catch(err =>{
     console.log(err)
  })
}
const getDb  = ()=>{

    if(db){
      return db ;
    }
    throw 'error in connection';

}


exports.MongoConnect = MongoConnect ; 
exports.getDb =  getDb ;


const getDb = require('../util/database').getDb;
const mongodb = require('mongodb')
class Product{
  constructor(title,imageUrl,price,description,prodId,userId){

          this.title = title;
          this.imageUrl = imageUrl;
          this.price =price ;
          this.description = description;
          this.userId = userId;
          //here we have to check for id because even if we are not passing an id , 
          // it is being created into an object and hence not returning false and
          // therfore making it into the update part of the save method

          if(prodId){
             this._id = new mongodb.ObjectId(prodId) ;
          }
          else{
            this._id = null ;
          }
          
           
  }

  save(){
    const db = getDb();

    if(this._id){
       //update the product
       return db.collection('products').updateOne({_id: this._id},{$set:this})
       .then(product =>{
         console.log('updated product saved successfully')
       })
    }
    
      // create the product
     return db.collection('products').insertOne(this)
     .then(product =>{
        console.log('Product created successfully');
     })
     .catch(err =>{
       console.log(err);
     })
    

    // return db.collection('products').insertOne(this);
  }

 static fetchAll(){
    const db = getDb();

     return db.collection('products')
     .find()
     .toArray()
     .then(products =>{
      
      return products
     })
     .catch(err =>{
       console.log(err);
     })

  }
  
  static findById(prodId){
     const db  = getDb();

     return db.collection('products')
     .findOne({_id: new mongodb.ObjectId(prodId)})
     .then(product =>{
      //  console.log(product);
       return product;
     }
      )
      .catch(err =>{
         console.log(err);
      })

  }

  // updateProd(prodId){
  //    const db= getDb();
      
  //    return db.collection('products').Update({_id: new mongodb.ObjectId(prodId)},)
  // }

  static deleteProductById(prodId){
    const db = getDb();
    
    return db.collection('products')
             .deleteOne({_id: new mongodb.ObjectId(prodId)})
             .then(product=>{
                console.log('product deleted successfully');
             })
             .catch(err =>{
               console.log(err) ; 
             })

  }

}

module.exports = Product;

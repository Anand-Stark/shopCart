const getDb = require("../util/database").getDb;
const MongoConnect = require("../util/database").MongoConnect;
const mongodb = require("mongodb");
// user model

class user {
  constructor(userName, email,cart,userId) {
    this.userName = userName;
    this.email = email;
    this.cart = cart ;
    this._id = userId;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((user) => {
        console.log("user created");
      });
  }




  static findById(userId) {
    const db = getDb();

    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((User) => {
        console.log(User);
        return User;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  //here we will be adding a cart to the options:
  //we will do it with the creation of the user itself since every cart will have its own unique user(one-one) realationship
  
  static addToCart(product){
    
   const cartProductIndex = this.cart.items.findIndex(p =>{
     return p.ProductId == p._id;
   })
   let newQuantity =  1 ;
   let UpdatedCart;
   const updatedProducts = [...this.cart.items] ; 
   if(cartProductIndex >= 0){
       
      newQuantity = updatedProducts[cartProductIndex].quantity + 1; 
      updatedProducts[cartProductIndex].quantity = newQuantity ;
      
   }
   else{
      
      
    updatedProducts.push({ProductId:new mongodb.ObjectId(product._id), quantity:newQuantity});
             
      }
   
    UpdatedCart = {
       items:updatedProducts 
    }
    
    console.log(UpdatedCart) ; 
    const db =getDb();
    return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)} , {$set :{cart: updatedCart}}) ; 
  }

 static  getCart(){
      const db = getDb();
      const productListInCart = this.cart.items.map( p =>{
           return p.ProductId ; 
      })
      return db.collection('products').find({_id:{$in: productListInCart}}).toArray() ; 
 }
}

module.exports = user;

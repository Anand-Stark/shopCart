
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').MongoConnect;
const user = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {

  user.findById('63f0c06462d689a2a6075763')
    .then(User => {
      console.log(User) ; 
      req.user = new user(User.userName,User.email,User.cart , User._id) ; 
      next();
    })
    .catch(err => console.log(err));

});



app.use('/admin', adminRoutes);
app.use(shopRoutes);
 
// app.use(errorController.get404);


mongoConnect(()=>{
   app.listen(3000,()=>{
   console.log('server running on port number 3000');
})
})



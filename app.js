const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect; //will be a function since we are exporting the func with a cb in it

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => { //only runs after app initialized                            
    // User.findByPk(1) //reach into my db get my user
    //     .then(user => {
    //         req.user = user; //whenever we call req.user in our code it comes embedded with sequel methods e.g .destroy
    //         next();
    //     })
    //     .catch(err => { console.log(err) });
    next();
})

app.use(shopRoutes);
app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000, () => {
        console.log('==============================')
        console.log('Server listening on port 3000')
        console.log('==============================')
    })
})


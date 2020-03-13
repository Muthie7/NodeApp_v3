const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }
  //create a new product in js,a new obj which follows the above form
  //save() method used to save it to the db
  save() {
    const db = getDb();
    return db.collection('products')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      })
  }

  static fetchAll() { //interact wiht our mongodb to fetch All products
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()//get all docs and turn them into an array i.e for few docs prefarably OR Pagination
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => { //Mpya hapa
        console.log(err)
      })
  }

}

module.exports = Product;
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing : false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title : title,
    price : price,
    imageUrl : imageUrl,
    description : description
  })
  .then(result => {
    res.redirect('/admin/products');
    console.log("created product");
  })
  .catch(err => {
    console.log(err)
  })
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId) 
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      // product.price = +product.price    
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing : editMode,
        product : product
      });
    })
    .catch(err => {
      console.log(err);
    })
};

exports.postEditProduct = (req, res, next) => {
  // Destructuring
  // console.log(req.body, "body")
  const {title, imageUrl, price, description, productId} = req.body;
  Product.findByPk(productId) 
  .then(product => {
    product.title = title;
    product.price = price;
    product.description = description;
    product.imageUrl = imageUrl;
    return product.save();
  })
  .then(result => {
    console.log("updated")
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.log(err);
  })
}

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("body in del prod contrll", prodId);
  Product.findByPk(prodId) 
  .then(product => {
    return product.destroy();
  })
  .then(result => {
    console.log("deleted")
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.log(err);
  })
  // Product.deleteProductById(prodId);
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log(err);
    })
};

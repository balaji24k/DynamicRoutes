const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // fetch prev cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      console.log("cart>>>>>>>>", cart);
      // check is existed
      const existedProductindex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existedProductindex];

      // increase quantity if already existed else add to cart
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = {
          ...existingProduct,
          qty: existingProduct.qty + 1,
        };
        cart.products = [...cart.products];
        cart.products[existedProductindex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

	static deleteProduct(id, productPrice) {
		fs.readFile(p, (err, fileContent) => {
			if (err) {
				return
			}
			const updatedCart = {...JSON.parse(fileContent)};
			const product = updatedCart.products.find(prod => prod.id === id);
			const productQty = product.qty;
			updatedCart.products = updatedCart.products.filter(
				prod => prod.id !== id
			);

			updatedCart.totalPrice = 
				updatedCart.totalPrice - productPrice*productQty;

			fs.writeFile(p, JSON.stringify(updatedCart), err => {
				console.log(err)
			})
		})
	}

	static getCart (cb) {
		fs.readFile(p, (err, fileContent) => {
			if (err) {
				cb(null)
			}
			else {
				const cart = JSON.parse(fileContent);
				cb(cart);
			}
		})
	}
};

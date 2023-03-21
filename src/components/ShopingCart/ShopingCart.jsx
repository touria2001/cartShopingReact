import React, { useState } from "react";
import Packed from "./components/Packed/Packed";
import Unpacked from "./components/Unpacked/Unpacked";
import styles from "./ShopingCart.module.css";

export default function ShopingCart() {
  const [formData, setFormData] = useState({ prodcut: "", price: 0 });
  const [products, setProducts] = useState([
    { name: "p1", price: 100, packed: false },
    { name: "p2", price: 4, packed: false },
    { name: "P3", price: 10, packed: false },
    { name: "P4", price: 80, packed: false },
    { name: "P5", price: 10, packed: false },
    { name: "p6", price: 25, packed: false },
    { name: "P7", price: 10, packed: false },
    { name: "P8", price: 18, packed: false },
    { name: "P9", price: 10, packed: false },
    { name: "P10", price: 7, packed: false },
  ]);

  const deleteItem = (index) => {
    const newItems = [...products];
    newItems.splice(index, 1);
    setProducts(newItems);
    console.log(newItems);
  };

  const markAllUnpacked = () => {
    const newItems = [...products];
    newItems.forEach((item) => {
      item.packed = false;
    });
    setProducts(newItems);
  };

  const submit = (e) => {
    e.preventDefault();
    setProducts([
      ...products,
      { name: formData.prodcut, price: formData.price, packed: false },
    ]);
    setFormData({ ...formData, prodcut: "", price: 0 });
  };

  const togglePacked = (index) => {
    const newItems = [...products];
    products[index].packed = !products[index].packed;
    setProducts(newItems);
  };
  const getTotalPackedItems = () => {
    let total = 0;
    products.forEach((item) => {
      if (item.packed === true) {
        total += item.price;
      }
    });
    return total;
  }

  return (
    <section className={styles.shopingCart}>
      <div className={styles.container}>
        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Product"
            onChange={(e) => {
              setFormData({ ...formData, prodcut: e.target.value });
            }}
          />
          <input
            type="number"
            placeholder="Price"
            onChange={(e) => {
              setFormData({ ...formData, price: e.target.value });
            }}
          />
          <button>Add</button>
        </form>
        <Unpacked
          products={products}
          togglePacked={togglePacked}
          deleteItem={deleteItem}
        />
        <Packed
          products={products}
          togglePacked={togglePacked}
          deleteItem={deleteItem}
          markAllUnpacked={markAllUnpacked}
        />
         <p>total: {getTotalPackedItems()}$</p>
      </div>
     
    </section>
  );
}

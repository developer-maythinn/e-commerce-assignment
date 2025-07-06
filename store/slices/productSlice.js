import { createSlice } from '@reduxjs/toolkit';

const initialProducts = [
  {
    id: 1,
    title: "CAT 910K",
    desc: "The CAT 910K Wheel Loader is designed for efficiency and reliability, perfect for a variety of construction and material handling tasks.",
    price: 200,
    img: "https://metrocat.com/en/CAT910/img/product/Wheel%20Loaders/WHEEL%20LOADER/910K/910K.jpg",
    images: [
      "https://metrocat.com/en/CAT910/img/product/Wheel%20Loaders/WHEEL%20LOADER/910K/910K.jpg"
    ],
    category: "wheel-loader",
  },
  {
    id: 2,
    title: "CAT 914K",
    desc: "The CAT 914K Wheel Loader delivers high productivity and fuel efficiency, making it ideal for demanding job sites.",
    price: 35,
    img: "https://metrocat.com/en/CAT914/img/product/Wheel%20Loaders/WHEEL%20LOADER/914K/914K.jpg",
    images: [
      "https://metrocat.com/en/CAT914/img/product/Wheel%20Loaders/WHEEL%20LOADER/914K/914K.jpg"
    ],
    category: "wheel-loader",
  },
  {
    id: 3,
    title: "313D2 GC",
    desc: "A larger cab with an ergonomic layout keeps you comfortable all shift long. ",
    price: 250,
    img: "https://metrocat.com/en/CAT313D2GC/img/product/Excavators/Excavators/313D2GC/313D2GC_001.jpg",
    images: [
      "https://metrocat.com/en/CAT313D2GC/img/product/Excavators/Excavators/313D2GC/313D2GC_005.jpg",
      "https://metrocat.com/en/CAT313D2GC/img/product/Excavators/Excavators/313D2GC/313D2GC_004.jpg"
    ],
    category: "excavators",
  },
  {
    id: 4,
    title: "426F2  ",
    desc: "new Cat 426F2 Backhoe Loader with features including spacious operator station, optional pilot controls, superior durability and outstanding performance. ",
    price: 170,
    img: "https://metrocat.com/en/CAT426/img/product/Backhoe%20loaders/426f2/426f2.jpg",
    images: [
      "https://metrocat.com/en/CAT426/img/product//Backhoe%20loaders/426f2/426f2.jpg"
    ],
    category: "backhoe-loaders",
  }
];

const productsSlice = createSlice({
  name: 'products',
  initialState: initialProducts,
  reducers: {}
});


export default productsSlice.reducer;
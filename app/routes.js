import { index, route } from "@react-router/dev/routes";

export default [index("routes/home.jsx"),
route("/cart", "routes/cart.jsx"),
route("/checkout", "routes/checkout.jsx"),
route("/product/:id", "routes/product.jsx"),
];

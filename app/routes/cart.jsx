import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router";
import CartItems from "../../components/features/Carts/CartItems";

export default function Cart(){ 
  const cart = useSelector((state) => state.cartItems.cartItems);
  const products = useSelector((state) => state.products);
  
  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 9.99 : 0;
  const tax =
    cartItems.length > 0 ? Math.round(subtotal * 0.08 * 100) / 100 : 0;
  const total = subtotal + shipping + tax;

  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Box sx={{ bgcolor: "#f5f6fa", minHeight: "100vh" }}>
      <Container sx={{ pt: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Shopping Cart
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Review your items before checkout
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Cart Items ({cartItems.length})
              </Typography>
              {cartItems.length === 0 && (
                <Typography color="text.secondary" sx={{ p: 2 }}>
                  Your cart is empty.
                </Typography>
              )}
              <CartItems cartItems={cartItems} />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ p: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Order Summary
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography color="text.secondary">
                  Subtotal ({cartItems.reduce((a, b) => a + b.quantity, 0)}{" "}
                  items)
                </Typography>
                <Typography fontWeight={600}>${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography color="text.secondary">Shipping</Typography>
                <Typography fontWeight={600}>${shipping.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography color="text.secondary">Tax</Typography>
                <Typography fontWeight={600}>${tax.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography fontWeight={700}>Total</Typography>
                <Typography fontWeight={700} color="primary">
                  ${total.toFixed(2)}
                </Typography>
              </Box>
              {/* <Link to="/checkout" style={{ textDecoration: "none" }}> */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ mb: 2, fontWeight: 700,}}
                  disabled={cartItems.length === 0}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              {/* </Link> */}
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button variant="outlined" fullWidth size="large">
                  Continue Shopping
                </Button>
              </Link>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

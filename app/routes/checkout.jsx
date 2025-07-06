import React, { useState } from "react";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PayPalIcon from "@mui/icons-material/AccountBalanceWallet";
import AppleIcon from "@mui/icons-material/Apple";
import LockIcon from "@mui/icons-material/Lock";
import Header from "../../components/layouts/Header";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router";

const steps = ["Cart", "Information", "Payment"];

export default function Checkout() {
  const cart = useSelector((state) => state.cartItems.cartItems);
  const products = useSelector((state) => state.products);
  const orderItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = orderItems.length > 0 ? 3.99 : 0;
  const tax =
    orderItems.length > 0 ? Math.round(subtotal * 0.08 * 100) / 100 : 0;
  const discount = 0;
  const total = subtotal + delivery + tax - discount;

  // Form state
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const [payment, setPayment] = useState("card");
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  function validate() {
    const errs = {};
    if (!shipping.firstName) errs.firstName = "Required";
    if (!shipping.lastName) errs.lastName = "Required";
    if (!shipping.address) errs.address = "Required";
    if (!shipping.city) errs.city = "Required";
    if (!shipping.state) errs.state = "Required";
    if (!shipping.zip) errs.zip = "Required";
    if (!shipping.phone) errs.phone = "Required";
    if (payment === "card") {
      if (!card.number) errs.cardNumber = "Required";
      if (!card.expiry) errs.expiry = "Required";
      if (!card.cvv) errs.cvv = "Required";
      if (!card.name) errs.cardName = "Required";
    }
    return errs;
  }

  function handleOrder(e) {
    e.preventDefault();
    setSubmitted(true);
    // Place order logic here
    setSnackbarOpen(true);
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
    navigate('/');
  };

  return (
    <Box sx={{ bgcolor: "#f5f6fa", minHeight: "100vh" }}>
      <Container sx={{ mt: 6 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Shipping Address */}
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  <Box component="span" sx={{ mr: 1, verticalAlign: "middle" }}>
                    <CreditCardIcon color="primary" />
                  </Box>
                  Shipping Address
                </Typography>
                <form>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="First Name"
                        fullWidth
                        size="small"
                        value={shipping.firstName}
                        onChange={(e) =>
                          setShipping((s) => ({
                            ...s,
                            firstName: e.target.value,
                          }))
                        }
                        error={!!errors.firstName && submitted}
                        helperText={submitted && errors.firstName}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Last Name"
                        fullWidth
                        size="small"
                        value={shipping.lastName}
                        onChange={(e) =>
                          setShipping((s) => ({
                            ...s,
                            lastName: e.target.value,
                          }))
                        }
                        error={!!errors.lastName && submitted}
                        helperText={submitted && errors.lastName}
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        label="Street Address"
                        fullWidth
                        size="small"
                        value={shipping.address}
                        onChange={(e) =>
                          setShipping((s) => ({
                            ...s,
                            address: e.target.value,
                          }))
                        }
                        error={!!errors.address && submitted}
                        helperText={submitted && errors.address}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <TextField
                        label="City"
                        fullWidth
                        size="small"
                        value={shipping.city}
                        onChange={(e) =>
                          setShipping((s) => ({ ...s, city: e.target.value }))
                        }
                        error={!!errors.city && submitted}
                        helperText={submitted && errors.city}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <TextField
                        label="State"
                        fullWidth
                        size="small"
                        value={shipping.state}
                        onChange={(e) =>
                          setShipping((s) => ({ ...s, state: e.target.value }))
                        }
                        error={!!errors.state && submitted}
                        helperText={submitted && errors.state}
                        select
                      >
                        <MenuItem value="">Select State</MenuItem>
                        <MenuItem value="NY">NY</MenuItem>
                        <MenuItem value="CA">CA</MenuItem>
                        <MenuItem value="TX">TX</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <TextField
                        label="ZIP Code"
                        fullWidth
                        size="small"
                        value={shipping.zip}
                        onChange={(e) =>
                          setShipping((s) => ({ ...s, zip: e.target.value }))
                        }
                        error={!!errors.zip && submitted}
                        helperText={submitted && errors.zip}
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        label="Phone Number"
                        fullWidth
                        size="small"
                        value={shipping.phone}
                        onChange={(e) =>
                          setShipping((s) => ({ ...s, phone: e.target.value }))
                        }
                        error={!!errors.phone && submitted}
                        helperText={submitted && errors.phone}
                      />
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
            {/* Payment Method */}
            <Card>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  <Box component="span" sx={{ mr: 1, verticalAlign: "middle" }}>
                    <CreditCardIcon color="primary" />
                  </Box>
                  Payment Method
                </Typography>
                <RadioGroup
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  sx={{ mb: 2 }}
                >
                  <FormControlLabel
                    value="card"
                    control={<Radio />}
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <CreditCardIcon color="primary" />
                        Credit/Debit Card
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <PayPalIcon color="primary" />
                        PayPal
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="apple"
                    control={<Radio />}
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AppleIcon color="primary" />
                        Apple Pay
                      </Box>
                    }
                  />
                </RadioGroup>
                {payment === "card" && (
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        label="Card Number"
                        fullWidth
                        size="small"
                        value={card.number}
                        onChange={(e) =>
                          setCard((c) => ({ ...c, number: e.target.value }))
                        }
                        error={!!errors.cardNumber && submitted}
                        helperText={submitted && errors.cardNumber}
                      />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <TextField
                        label="Expiry Date"
                        fullWidth
                        size="small"
                        value={card.expiry}
                        onChange={(e) =>
                          setCard((c) => ({ ...c, expiry: e.target.value }))
                        }
                        error={!!errors.expiry && submitted}
                        helperText={submitted && errors.expiry}
                      />
                    </Grid>
                    <Grid size={{ xs: 3 }}>
                      <TextField
                        label="CVV"
                        fullWidth
                        size="small"
                        value={card.cvv}
                        onChange={(e) =>
                          setCard((c) => ({ ...c, cvv: e.target.value }))
                        }
                        error={!!errors.cvv && submitted}
                        helperText={submitted && errors.cvv}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        label="Cardholder Name"
                        fullWidth
                        size="small"
                        value={card.name}
                        onChange={(e) =>
                          setCard((c) => ({ ...c, name: e.target.value }))
                        }
                        error={!!errors.cardName && submitted}
                        helperText={submitted && errors.cardName}
                      />
                    </Grid>
                  </Grid>
                )}
              </CardContent>
            </Card>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 3, fontWeight: 700 }}
              onClick={handleOrder}
            >
              Complete Order
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            {/* Order Summary */}
            <Card sx={{ p: 3 }}>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Order Summary
              </Typography>
              {orderItems.map((item, idx) => (
                <Box
                  key={item.id}
                  sx={{ display: "flex", alignItems: "center", mb: 2 }}
                >
                  <CardMedia
                    component="img"
                    image={item.img}
                    alt={item.title}
                    sx={{
                      width: 48,
                      height: 48,
                      objectFit: "cover",
                      borderRadius: 2,
                      mr: 2,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={600}>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Qty: {item.quantity}
                    </Typography>
                  </Box>
                  <Typography fontWeight={600}>
                    ${item.price.toFixed(2)}
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography fontWeight={600}>${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography color="text.secondary">Delivery Fee</Typography>
                <Typography fontWeight={600}>${delivery.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography color="text.secondary">Tax</Typography>
                <Typography fontWeight={600}>${tax.toFixed(2)}</Typography>
              </Box>
              {discount > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography color="success.main">Discount</Typography>
                  <Typography fontWeight={600} color="success.main">
                    -${discount.toFixed(2)}
                  </Typography>
                </Box>
              )}
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography fontWeight={700}>Total</Typography>
                <Typography fontWeight={700} color="primary">
                  ${total.toFixed(2)}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                <b>Estimated delivery:</b> 25-35 mins
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                <LockIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 0.5 }}
                />{" "}
                Your payment info is secure
              </Typography>
              <Typography variant="caption" color="text.secondary">
                By placing your order, you agree to our Terms of Service and
                Privacy Policy
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Order placed successfully!
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

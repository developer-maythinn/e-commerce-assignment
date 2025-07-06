import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity } from "../../store/slices/cartSlice";
import { useParams, useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import Quantity from "../../components/features/Quantity";

export default function ProductDetail() {
  const { id } = useParams();
  const products = useSelector((state) => state.products);
  const product = products.find((p) => p.id === Number(id));
  const cartItems = useSelector(state => state.cartItems.cartItems)
  const quantityItem = cartItems.find((item) => item.id === product.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = React.useState(
    product?.images?.[0] || product?.img
  );

  if (!product) {
    return (
      <Container sx={{ mt: 8 }}>
        <Typography variant="h5">Product not found.</Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };


  return (
    <Box sx={{ bgcolor: "#f5f6fa", minHeight: "100vh" }}>
      <Container maxWidth="md" sx={{ pt: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link
            to="/"
            style={{ textDecoration: "underline", color: "inherit" }}
          >
            Home
          </Link>
          <Link
            to="/"
            style={{ textDecoration: "underline", color: "inherit" }}
          >
            {product.category}
          </Link>
          <Typography color="text.primary">{product.title}</Typography>
        </Breadcrumbs>
        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 2,
                mb: 2,
                bgcolor: "#fff",
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
              <CardMedia
                component="img"
                image={selectedImage}
                alt={product.title}
                sx={{ width: "100%", height: 350, objectFit: "contain" }}
              />
            </Card>
            <Box sx={{ display: "flex", gap: 2 }}>
              {(product.images || [product.img]).map((img, idx) => (
                <Card
                  key={idx}
                  sx={{
                    width: 64,
                    height: 64,
                    p: 0.5,
                    bgcolor: selectedImage === img ? "#e0e7ff" : "#fff",
                    border: selectedImage === img ? 2 : 1,
                    borderColor:
                      selectedImage === img ? "primary.main" : "divider",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedImage(img)}
                >
                  <CardMedia
                    component="img"
                    image={img}
                    alt={"thumb-" + idx}
                    sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </Card>
              ))}
            </Box>
          </Grid>
          {/* Product Info */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {product.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Rating value={4.8} precision={0.1} readOnly size="small" />
              <Typography variant="body2" fontWeight={600}>
                4.8
              </Typography>
              <Typography variant="body2" color="text.secondary">
                | 1,247 reviews
              </Typography>
              <Chip
                label="In Stock"
                color="success"
                size="small"
                sx={{ ml: 2 }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <Typography variant="h4" fontWeight={700} color="primary">
                ${product.price.toLocaleString()}.00
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Free shipping on orders over $99
            </Typography>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
              Description
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {product.desc}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
                Quantity
              </Typography>
              <Quantity
                item={{ ...product, quantity: quantityItem ? quantityItem.quantity : 0 }}
                onAddToCart={() => dispatch(addToCart({ id: product.id, quantity: 1 }))}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ width: "100%", mb: 2, fontWeight: 700 }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
              Key Features
            </Typography>
            <Box component="ul" sx={{ pl: 3, m: 0, mb: 2 }}>
              <li
                style={{ color: "#22c55e", marginBottom: 4, fontWeight: 500 }}
              >
                <span style={{ color: "#222", marginLeft: 8 }}>
                  Premium quality
                </span>
              </li>
              <li
                style={{ color: "#22c55e", marginBottom: 4, fontWeight: 500 }}
              >
                <span style={{ color: "#222", marginLeft: 8 }}>
                  Fast shipping
                </span>
              </li>
            </Box>
          </Grid>
        </Grid>
      </Container>

    </Box>
  );
}

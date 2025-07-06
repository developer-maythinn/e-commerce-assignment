import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import { addToCart } from "../../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Grid
        size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        sx={{ display: "flex", alignItems: "stretch" }}
      >
        <Box
          sx={{
            borderRadius: 3,
            boxShadow: 2,
            position: "relative",
            cursor: "pointer",
            // flexWrap: "wrap",
            // display: "flex",
            // alignContent: "space-between",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <CardMedia
              component="img"
              height="180"
              image={product.img}
              alt={product.title}
              sx={{ objectFit: "contain", bgcolor: "#fff" }}
              onClick={() => navigate(`/product/${product.id}`)}
            />
              <Box
                sx={{ p: 2 }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ wordBreak: "break-word", overflow: "hidden",  }}
                  fontWeight={600}
                  gutterBottom
                >
                  {product.title}
                </Typography>

                <Typography variant="h6" color="primary" fontWeight={700}>
                  ${product.price}
                </Typography>
              </Box>
              <Box sx={{ p: 2,}}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  sx={{ fontWeight: 600, }}
                  onClick={() =>
                    dispatch(addToCart({ id: product.id, quantity: 1 }))
                  }
                >
                  Add to Cart
                </Button>
              </Box>
           
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default ProductCard;

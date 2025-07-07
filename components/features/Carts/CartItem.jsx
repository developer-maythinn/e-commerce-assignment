import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router";
import { decreaseQuantity, increaseQuantity, removeItem } from "../../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import Quantity from "../Quantity";
import { Grid } from "@mui/material";


function CartItem({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <Grid container
        sx={{
          mb: 2,
          p: 1,
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: 1,
          alignItems: 'center',
          textAlign: {xs: "center", sm: "start"}
        }}
      >
        <Grid size={{xs: 12, sm: 2 }}>
          <CardMedia
            component="img"
            image={item.img}
            alt={item.title}
            onClick={() => navigate(`/product/${item.id}`)}
            sx={{
              width: {xs: "100%", sm:70},
              height: 70,
              objectFit: "contain",
              borderRadius: 2,
              mr: 2,
              bgcolor: "#f5f6fa",
              cursor: "pointer"
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }} sx={{my: {xs: 2, sm: 0, cursor: "pointer"}}} onClick={() => navigate(`/product/${item.id}`)}>
          <Typography fontWeight={600}>{item.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {item.desc}
          </Typography>
          <Typography color="primary" fontWeight={600} sx={{ mt: 0.5 }}>
            ${item.price.toFixed(2)}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
          <Quantity item={item} />
          <Typography fontWeight={600} sx={{ width: 80, textAlign: "right" }}>
            ${(item.price * item.quantity).toFixed(2)}

          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 2 }}>
          <Button
            color="error"
            size="small"
            startIcon={<DeleteOutlineIcon />}
            sx={{ ml: 2 }}
            onClick={() => dispatch(removeItem(item.id))}
          >
            Remove
          </Button>
        </Grid>

      </Grid >
    </>
  );
}

export default CartItem;

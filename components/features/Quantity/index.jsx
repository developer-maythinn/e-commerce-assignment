import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "../../../store/slices/cartSlice";

function Quantity({ item, onAddToCart }) {
    const dispatch = useDispatch();
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}>
                <IconButton
                    size="small"
                    onClick={() =>
                        dispatch(
                            decreaseQuantity(item.id)
                        )
                    }
                    disabled={item.quantity === 0}
                >
                    <RemoveCircleOutlineIcon />
                </IconButton>
                <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                <IconButton
                    size="small"
                    onClick={() => {
                        if (item.quantity === 0 && onAddToCart) {
                            onAddToCart();
                        } else {
                            dispatch(
                                increaseQuantity(item.id)
                            );
                        }
                    }}
                >
                    <AddCircleOutlineIcon />
                </IconButton>
            </Box>
        </>
    );
}

export default Quantity;

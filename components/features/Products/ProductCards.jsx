import React from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@mui/material";

function ProductCards({ filtered }) {
  return (
    <>
      <Grid container spacing={3}>
        {filtered?.map((product) => (
          <React.Fragment key={product.id}>
            <ProductCard product={product} />
          </React.Fragment>
        ))}
      </Grid>
    </>
  );
}

export default ProductCards;

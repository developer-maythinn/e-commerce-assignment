import React from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ProductCards from "../../components/features/Products/ProductCards";

export function meta() {
  return [
    { title: "Metrocat - Discover Amazing Products" },
    {
      name: "description",
      content: "Shop the latest trends with unbeatable prices",
    },
  ];
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "excavators", label: "Excavators" },
  { value: "wheel-loader", label: "Wheel Loaders" },
  { value: "backhoe-loaders", label: "Backhoe loaders" },
];

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "0-50", label: "$0 - $50" },
  { value: "51-200", label: "$51 - $200" },
  { value: "201+", label: "$201+" },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export default function Home() {
  const products = useSelector((state) => state.products);
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("all");
  const [price, setPrice] = React.useState("all");
  const [sort, setSort] = React.useState("featured");

  // Filtering
  let filtered = products?.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (search === "" || p.title.toLowerCase().includes(search.toLowerCase())) &&
      (price === "all" ||
        (price === "0-50" && p.price <= 50) ||
        (price === "51-200" && p.price > 50 && p.price <= 200) ||
        (price === "201+" && p.price > 200))
  );
  // Sorting
  if (sort === "price-low")
    filtered = filtered.slice().sort((a, b) => a.price - b.price);
  if (sort === "price-high")
    filtered = filtered.slice().sort((a, b) => b.price - a.price);



  return (
    <Box sx={{ bgcolor: "#f5f6fa", minHeight: "100vh" }}>


      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "linear-gradient(90deg, #5f2eea 0%, #38b6ff 100%)",
          color: "#fff",
          py: 8,
          px: 1,
          textAlign: "center",
          background: "linear-gradient(90deg, #5f2eea 0%, #38b6ff 100%)",
        }}
      >
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Discover Amazing Products
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Shop the latest trends with unbeatable prices
        </Typography>
        <Box sx={{mx: "auto", maxWidth: 400, minWidth: 200 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#f0f1f6",
              borderRadius: 2,
              px: 2,
              mx: 4
            }}
          >
            <SearchIcon color="action" />
            <InputBase
              placeholder="Search products..."
              sx={{ ml: 1, flex: 1 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        </Box>
      </Box>

      {/* Filters and Sort */}
      <Container sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          >
            {categories.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            size="small"
            sx={{ minWidth: 120 }}
          >
            {priceRanges.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ flex: 1 }} />
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          >
            {sortOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Product Grid */}
        <ProductCards filtered={filtered} />
      </Container>


    </Box>
  );
}

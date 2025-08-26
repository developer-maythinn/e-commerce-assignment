import { Box, Typography } from '@mui/material'
import { Link } from 'react-router';

function Footer() {
    let year = new Date().getFullYear();
  return (
    <>
   {/* Footer */}
      <Box sx={{ bgcolor: "#181c32", color: "#fff", mt: 8, py: 2, textAlign: "center", position:" fixed", bottom: 0, width: "100%" }}>
        <Typography>Copy right © {year} | Powered by <Link to={"https://maythinn-portfolio.vercel.app/"} style={{color: "#fff", fontWeight: "bold"}}>May Thinn Khine </Link></Typography>
      </Box>
    </>
  )
}

export default Footer
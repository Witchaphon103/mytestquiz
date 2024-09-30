import React from "react";
import Link from "next/link";
import { Button, Typography, Stack } from "@mui/material";

const HomePage = () => {
  return (
    <div>
      <Typography variant="h2" textAlign="center">หน้าเเรก</Typography>

      <Stack spacing={2} justifyContent="center" alignItems="center" marginTop={4}>
        <Link href="/signin" passHref>
          <Button variant="contained" color="primary">
            ไปหน้า Sign In
          </Button>
        </Link>
      </Stack>
    </div>
  );
};

export default HomePage;

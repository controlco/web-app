import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import Box from "@material-ui/core/Box";

const Index = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/signin/">Iniciar sesión</Link>
      </Box>
    </Container>
  );
};

export default Index;

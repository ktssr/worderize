import { Box, Container, Stack } from "@mui/material";

export default ({ children }) => {
  return (
    <Box width="100vw" height="100vh" bgcolor="#171717" overflow="auto">
      <Container maxWidth="md" sx={{ display: "flex" }}>
        <Stack
          flex={1}
          justifyContent="flex-start"
          py={10}
          alignItems="center"
          spacing={5}
        >
          {children}
        </Stack>
      </Container>
    </Box>
  );
};

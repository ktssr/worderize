import { Box, Container } from "@mui/material";
import { Stack } from "@mui/system";
import Main from "./Main";
import Title from "./Title";

export default () => {
  return (
    <Box width="100vw" height="100vh" bgcolor="#171717">
      <Container maxWidth="md" sx={{ height: "100%", display: "flex", overflow:"auto"}}>
        <Stack
          flex={1}
          justifyContent="flex-start"
          py={10}
          alignItems="center"
          spacing={5}
        >
          <Title />
          <Main />
        </Stack>
      </Container>
    </Box>
  );
};

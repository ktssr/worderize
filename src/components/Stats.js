import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

export default ({ allWords, words }) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    width="345px"
    color="pink"
  >
    <Typography variant="p">Total : {allWords}</Typography>
    <Typography variant="p">Remaining : {words}</Typography>
  </Stack>
);

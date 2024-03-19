import { Stack, Typography } from "@mui/material";

export const Logo = () => {
  return (
    <Stack direction="row" justifyContent="flex-start">
      <Typography variant="h3" fontWeight="bold" color="primary.dark">
        CA
      </Typography>
      <Typography variant="h3" fontWeight="bold" color="primary">
        CYD-
      </Typography>
      <Typography variant="h3" fontWeight="bold" color="primary.light">
        FILS
      </Typography>
    </Stack>
  );
};

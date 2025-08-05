import { Box, Typography } from "@mui/material";
import React from "react";
import { defaultColors } from "../ThemeProvider/themeConfigs";

const LabelledText = ({
  title,
  text,
  moreInfo,
}: {
  title: string;
  text: string;
  moreInfo?: string;
}) => {
  return (
    <Box>
      <Typography variant="body3" color={defaultColors.primaryLighter}>
        {title}
      </Typography>
      <Typography
        variant="body1"
        color={defaultColors.neutralDarkGrey}
        sx={{ textTransform: "capitalize" }}>
        {text}
      </Typography>
      {moreInfo && (
        <Typography variant="body3" color={defaultColors.neutralDarkGrey}>
          ({moreInfo})
        </Typography>
      )}
    </Box>
  );
};

export default LabelledText;

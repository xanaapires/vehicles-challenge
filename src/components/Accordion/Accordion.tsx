import React, { ReactNode, useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MUIAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { defaultColors } from "../ThemeProvider/themeConfigs";

type PropTypes = {
  header: ReactNode;
  children: ReactNode;
  id?: string;
  defaultExpanded?: boolean;
};

const defaultProps: Partial<PropTypes> = {
  id: "",
  defaultExpanded: false,
};

const Accordion = ({ header, children, id, defaultExpanded }: PropTypes) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(!!defaultExpanded);

  useEffect(() => {
    setIsExpanded(!!defaultExpanded);
  }, [defaultExpanded]);

  return (
    <MUIAccordion
      sx={{
        backgroundColor: "transparent",
        borderRadius: "4px",
        borderBottom: "0",
        padding: 0,
        marginTop: "0px",
        width: "100%",
        boxShadow: "none",

        ":before": {
          height: 0,
        },

        "&.Mui-expanded": {
          marginTop: "0px",
          marginBottom: 0,
          backgroundColor: defaultColors.neutralWhite,
        },
        "&.Mui-expanded:first-of-type": { marginTop: "0px" },
      }}
      data-testid="accordion"
      defaultExpanded={defaultExpanded}
      expanded={isExpanded}>
      <AccordionSummary
        onClick={() => setIsExpanded(!isExpanded)}
        expandIcon={<KeyboardArrowDownIcon />}
        sx={{
          position: "relative",
          backgroundColor: defaultColors.neutralWhite,
          borderRadius: "4px",
          borderBottom: "0",
          padding: "16px",
          margin: 0,

          "& .MuiAccordionSummary-content": {
            margin: 0,
          },
          "& .MuiAccordionSummary-content.Mui-expanded": {
            margin: 0,
          },
        }}
        id={`accordion-summary-${id}`}
        aria-controls={`accordion-details-${id}`}>
        {header}
      </AccordionSummary>
      <AccordionDetails
        onClick={() => setIsExpanded(true)}
        sx={{
          backgroundColor: defaultColors.neutralWhite,
          paddingTop: 0,
          paddingBottom: "16px",
          "& .MuiBox-root:last-of-type": { marginBottom: 0 },
          position: "relative",
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
        }}
        id={`accordion-details-${id}`}>
        {children}
      </AccordionDetails>
    </MUIAccordion>
  );
};

Accordion.defaultProps = defaultProps;

export default Accordion;

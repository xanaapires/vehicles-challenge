import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import { defaultColors } from "../ThemeProvider/themeConfigs";

export type Option = { label: string; value: string | number };

const ITEM_HEIGHT = 36;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

type PropTypes = {
  label: string;
  options: Option[];
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
};

const defaultProps: Partial<PropTypes> = {
  disabled: false,
};

const Dropdown = ({ label, options, onChange, value, disabled }: PropTypes) => {
  useEffect(() => {
    onChange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormControl
      sx={{
        width: "100%",
        backgroundColor: defaultColors.neutralWhite,
      }}
      disabled={disabled}>
      <InputLabel id="dropdown-label" size="small">
        {label}
      </InputLabel>
      <Select
        labelId="dropdown-label"
        id="dropdown-select"
        value={value}
        label={label}
        fullWidth
        size="small"
        onChange={({ target }) => onChange?.(target.value)}
        inputProps={{ "data-testid": "dropdown" }}
        sx={{
          maxHeight: "180px",
          "& .MuiMenu-list": { padding: 0 },
        }}
        MenuProps={MenuProps}>
        {options?.map((option) => (
          <MenuItem
            value={option.value}
            key={option.value}
            data-testid={`dropdown-option-${option.value}`}
            sx={{
              ":hover": {
                backgroundColor: "var(--color-skanGreyLight)",
              },
              ":focus": {
                backgroundColor: "var(--color-skanGreyLight)",
              },
            }}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

Dropdown.defaultProps = defaultProps;

export default Dropdown;

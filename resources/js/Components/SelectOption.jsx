import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import React from "react";

export default function SelectOption({
    children,
    className,
    errors,

    label,
    ...props
}) {
    return (
        <>
            <FormControl sx={{ minWidth: "100%" }}>
                <InputLabel
                    id={`${
                        errors
                            ? "demo-simple-select-error-label"
                            : "demo-simple-select-standard-label"
                    }`}
                >
                    {label}
                </InputLabel>
                <Select
                    className={`${className} capitalize`}
                    {...props}
                    labelId={`${
                        errors
                            ? "demo-simple-select-error-label"
                            : "demo-simple-select-standard-label"
                    }`}
                    id={`${
                        errors
                            ? "demo-simple-select-error"
                            : "demo-simple-select-standard"
                    }`}
                >
                    {children}
                </Select>
                {errors && <FormHelperText>{errors}</FormHelperText>}
            </FormControl>
        </>
    );
}

import { Box, TextField } from "@mui/material";
import React from "react";

export default function InputText({ errors, variant = "standard", ...props }) {
    return (
        <>
            <TextField
                className="px-3 w-full"
                id={`${variant}-basic`}
                variant={variant}
                error={errors ? true : false}
                helperText={errors}
                focused
                {...props}
            />
        </>
    );
}

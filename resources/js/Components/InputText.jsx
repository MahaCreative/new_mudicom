import { Box, TextField } from "@mui/material";
import React from "react";

export default function InputText({ errors, variant = "standard", ...props }) {
    return (
        <>
            <Box
                component="form"
                sx={{ "& > :not(style)": { width: "100%" } }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id={`${variant}-basic`}
                    variant={variant}
                    error={errors ? true : false}
                    helperText={errors}
                    focused
                    {...props}
                />
            </Box>
        </>
    );
}

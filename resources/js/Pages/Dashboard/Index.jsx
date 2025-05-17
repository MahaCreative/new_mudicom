import AuthLayout from "@/Layouts/AuthLayout";
import { Link } from "@inertiajs/react";
import { ArrowForwardIos } from "@mui/icons-material";
import React, { useState } from "react";

export default function Index() {
    const [open, setOpen] = useState(false);
    return <div></div>;
}

Index.layout = (page) => <AuthLayout children={page} />;

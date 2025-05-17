import { Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import React, { Fragment } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Dialogs({
    open,
    handleClose,
    children,
    maxWidth = "xl",
    title,
}) {
    return (
        <Fragment>
            <Dialog
                open={open}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth={maxWidth}
            >
                <DialogTitle className="border-b border-blue-400">
                    {title}
                </DialogTitle>
                <DialogContent>{children}</DialogContent>
            </Dialog>
        </Fragment>
    );
}

import { Link } from "@inertiajs/react";
import { ArrowForwardIos } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";

function DropdownLinks({ icon, title, active, children, ...props }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    return (
        <button
            ref={ref}
            onClick={() => setOpen(!open)}
            className={` px-4 py-2 border-b border-x-white text-white tracking-tighter leading-3 font-medium text-lg  usetransisi w-full`}
        >
            <div
                {...props}
                className="flex flex-row gap-3 justify-between items-center"
            >
                <div className="flex items-center gap-x-3">
                    {icon}
                    {title}
                </div>
                <p
                    className={`${
                        open ? "rotate-90" : ""
                    } text-base text-white usetransisi`}
                >
                    <ArrowForwardIos color="inherit" fontSize="inherit" />
                </p>
            </div>
            <div
                className={`${
                    open
                        ? "min-h-[40px] max-h-[200px]"
                        : "min-h-0 max-h-0 overflow-y-hidden"
                } usetransisi`}
            >
                {children}
            </div>
        </button>
    );
}

function Item({ icon, title, ...props }) {
    return (
        <Link
            {...props}
            className={
                "pl-8 px-2 mt-1 text-sm flex flex-row gap-3 items-center py-2 text-white tracking-tighter leading-3 font-medium  hover:bg-blue-900 usetransisi rounded-md"
            }
        >
            {icon}
            <p>{title}</p>
        </Link>
    );
}

DropdownLinks.Item = Item;
export default DropdownLinks;

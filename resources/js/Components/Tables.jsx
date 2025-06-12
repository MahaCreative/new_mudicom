import React from "react";

function Tables({ children, fixed = false }) {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden dark:border-neutral-700 w-full overflow-x-auto">
            <table
                className={`table-none divide-y divide-gray-200 table ${
                    fixed ? "table-fixed" : "table-auto"
                } min-w-full`}
            >
                {children}
            </table>
        </div>
    );
}

function Th({ className, children }) {
    return (
        <th
            scope="col"
            className={`${className} px-2 py-2 text-start  font-medium  uppercase `}
        >
            {children}
        </th>
    );
}

function Tbody({ className, children }) {
    return <tbody className="divide-y divide-gray-200 ">{children}</tbody>;
}
function Td({ className, children, ...props }) {
    return (
        <td
            {...props}
            className={`${className} p-2   font-medium capitalize text-xs  `}
        >
            {children}
        </td>
    );
}

Tables.Th = Th;
Tables.Tbody = Tbody;
Tables.Td = Td;
export default Tables;

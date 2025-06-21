import Profile from "@/Components/Guest/Profile";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link, usePage } from "@inertiajs/react";
import React from "react";

export default function Index(props) {
    return (
        <Profile>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
                totam quia esse autem sit quidem adipisci ex ipsum alias
                architecto est praesentium, laborum in neque commodi
                consequuntur quasi consequatur officiis?
            </p>
        </Profile>
    );
}

Index.layout = (page) => <GuestLayout children={page} />;

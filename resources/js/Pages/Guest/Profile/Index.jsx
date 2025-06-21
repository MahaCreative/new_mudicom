import Profile from "@/Components/Guest/Profile";
import React from "react";
import Create from "./Create";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Index(props) {
    const myProfile = props.myProfile;
    console.log(myProfile);

    return (
        <Profile>
            <Create myProfile={myProfile} />
        </Profile>
    );
}

Index.layout = (page) => <GuestLayout children={page} />;

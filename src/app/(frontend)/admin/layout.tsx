import { AccessDeniedAlert } from "@/components/AccessDeniedAlert";
import { protectRoute } from "@/utilities/getMeUser";
import React from "react";

export default async function AdminLayout({children}: {children: React.ReactNode}) {
    //Hard restriction - only admin role allowed
    const {authorized, fallbackRoute} = await protectRoute(['admin'])

    if (!authorized) {
        //halt rendering of the admin pages
        return <AccessDeniedAlert fallbackRoute={fallbackRoute}/>
    }

    return <>{children}</>
}
import { type NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt/verifyToken";

const ProtectedPages = ['/dashboard/admin', '/dashboard/volunteer', '/dashboard/donor']

export async function proxy(req: NextRequest) {
    const token = req.cookies.get("authToken")?.value;
    const path = req.nextUrl.pathname;
    const protectedForUsers = path.startsWith('/login') || path.startsWith('/register');

    if (!token) {
        if (protectedForUsers) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const decoded = await verifyToken(token);

    if (!decoded) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const { userType } = decoded as { userType: string }


    const isProtectedPage = ProtectedPages.some((page) => path.startsWith(page));

    if (isProtectedPage) {
        const expectedUserType = path.split('/')[2];
        if (userType !== expectedUserType) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    if (decoded && protectedForUsers) {
        return NextResponse.redirect(new URL("/", req.url));
    }

}

export const config = {
    matcher: [
        "/dashboard/admin/:path*",
        "/dashboard/volunteer/:path*",
        "/dashboard/donor/:path*",
        "/login",
        "/register",
    ],
};

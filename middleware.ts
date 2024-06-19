import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	if (path === "/") {
		return NextResponse.next();
	}
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	if (!token && path === "/protected") {
		return NextResponse.redirect(new URL("/login", req.url));
	} else if (token && (path === "/login" || path === "/register")) {
		return NextResponse.redirect(new URL("/protected", req.url));
	}
	return NextResponse.next();
}

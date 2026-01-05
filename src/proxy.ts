import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";
export {default} from "next-auth/middleware";

export async function proxy(request: NextRequest) {
  const token = await getToken({req: request});
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/api/auth") ||
      url.pathname.startsWith("/register") ||
      url.pathname.startsWith("/login"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    !token &&
    (url.pathname.startsWith("/api/upload-auth") || url.pathname.startsWith("/api/videos"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/login", "/register", "/"],
};

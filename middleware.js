import { NextResponse } from "next/server";

export function middleware(request) {
  const authToken = request.cookies.get("authToken")?.value;
  console.log(request.nextUrl.pathname,"pathhhhh")
  const currentPath = request.nextUrl.pathname;

  // Define paths that do not require authentication
  const publicPaths = ["/login", "/otp"];

  // Check if the current path is a public path
  const isPublicPath = publicPaths.includes(currentPath);

  // If the path is public and there is no authToken, allow normal flow
  if (isPublicPath && !authToken) {
    return NextResponse.next();
  }

  // If the path is public and there is an authToken, redirect to "/"
  else if (isPublicPath && authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the path is not public and there is no authToken, redirect to "/login"
  else if (!isPublicPath && !authToken) {
    
    console.log(currentPath,"22222222222222222")
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the path is not public and there is an authToken, allow normal flow
  return NextResponse.next();
}

// Configuration for path matching
export const config = {
  matcher: ["/", "/otp","/login", "/job/:path*","/customers/:path*", "/staff/:path*","/supervisors/:path*","/territory/:path*","/sites/:path*","/roles/:path*","/billing/:path*","/cms/:path*","/editProfile"],
};

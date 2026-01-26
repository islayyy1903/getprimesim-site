import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware to handle POST requests to root path
 * Prevents "Failed to find Server Action" errors
 */
export function middleware(request: NextRequest) {
  // Handle POST requests to root path
  if (request.method === "POST" && request.nextUrl.pathname === "/") {
    console.log("⚠️ POST request intercepted at root path /");
    console.log("  - URL:", request.url);
    console.log("  - This is likely a misrouted request or a Server Action error");
    
    // Return 405 Method Not Allowed
    return NextResponse.json(
      { 
        error: "Method Not Allowed",
        message: "POST requests are not supported at the root path."
      },
      { status: 405 }
    );
  }

  // Allow all other requests to proceed
  return NextResponse.next();
}

// Only run middleware for root path POST requests
export const config = {
  matcher: [
    /*
     * Only match root path to avoid interfering with other routes
     */
    "/",
  ],
};

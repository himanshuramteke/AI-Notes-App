import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

function hasAuthCookies(request: NextRequest) {
  const authCookies = request.cookies.getAll().filter(cookie => 
    cookie.name.includes('supabase') || 
    cookie.name.includes('auth-token') ||
    cookie.name.includes('access-token') ||
    cookie.name.includes('refresh-token')
  );
  return authCookies.length > 0;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const isAuthRoute =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/sign-up";

  if (isAuthRoute) {
    // Only check for user if there are auth cookies
    if (hasAuthCookies(request)) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          return NextResponse.redirect(
            new URL("/", process.env.NEXT_PUBLIC_BASE_URL)
          );
        }
      } catch (error) {
        // Auth error on auth routes is fine - user is not authenticated
        console.log("Auth error on auth route (expected):", error);
      }
    }
  }

  const { searchParams, pathname } = new URL(request.url);

  if (!searchParams.get("noteId") && pathname === "/") {
    // Only try to get user if there are auth cookies
    if (!hasAuthCookies(request)) {
      // No auth cookies, redirect to login
      return NextResponse.redirect(
        new URL("/login", process.env.NEXT_PUBLIC_BASE_URL)
      );
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { newestNoteId } = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-newest-note?userId=${user.id}`
        ).then((res) => res.json());

        if (newestNoteId) {
          const url = request.nextUrl.clone();
          url.searchParams.set("noteId", newestNoteId);
          return NextResponse.redirect(url);
        } else {
          const { noteId } = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-new-note?userId=${user.id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          ).then((res) => res.json());
          const url = request.nextUrl.clone();
          url.searchParams.set("noteId", noteId);
          return NextResponse.redirect(url);
        }
      } else {
        // User is not authenticated, redirect to login
        return NextResponse.redirect(
          new URL("/login", process.env.NEXT_PUBLIC_BASE_URL)
        );
      }
    } catch (error) {
      // Handle auth errors by redirecting to login
      console.log("Auth error in middleware:", error);
      return NextResponse.redirect(
        new URL("/login", process.env.NEXT_PUBLIC_BASE_URL)
      );
    }
  }

  return supabaseResponse;
}

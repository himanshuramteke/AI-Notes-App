import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  const client = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );

  return client;
}

async function hasAuthSession() {
  // Check for Supabase auth cookies
  try {
    const cookieStore = await cookies();
    const authCookies = cookieStore
      .getAll()
      .filter(
        (cookie) =>
          cookie.name.includes("supabase") ||
          cookie.name.includes("auth-token") ||
          cookie.name.includes("access-token") ||
          cookie.name.includes("refresh-token")
      );
    return authCookies.length > 0;
  } catch {
    return false;
  }
}

export async function getUser() {
  // Quick check to see if there might be an auth session
  if (!(await hasAuthSession())) {
    return null;
  }

  try {
    const client = await createClient();
    if (!client) {
      return null;
    }

    const { auth } = client;
    const userObject = await auth.getUser();

    if (userObject.error) {
      // Don't log AuthSessionMissingError as it's expected when not authenticated
      if (userObject.error.message !== "Auth session missing!") {
        console.error(userObject.error);
      }
      return null;
    }

    return userObject.data.user;
  } catch (error: unknown) {
    // Handle AuthSessionMissingError or other auth errors
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    if (errorMessage !== "Auth session missing!") {
      console.error("Unexpected auth error:", error);
    }
    return null;
  }
}

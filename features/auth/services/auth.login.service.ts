import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { parseUserAgent } from "./auth.utils";

export async function loginUser(
  data: { email: string; password: string },
  clientInfo: { userAgent: string; ip: string; city: string | null; region: string | null; country: string | null }
) {
  const { email, password } = data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // Login successful, track session
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      try {
        const { userAgent, ip: realIp, city, region, country } = clientInfo;
        const { browser, os } = parseUserAgent(userAgent);
        
        let resolvedCity = city;
        let resolvedRegion = region;
        let resolvedCountry = country;

        // Fallback to IP geolocation API if headers are missing and IP is public
        if (!resolvedCountry && realIp !== "127.0.0.1" && realIp !== "::1") {
          const geoRes = await fetch(`http://ip-api.com/json/${realIp}?fields=status,countryCode,regionName,city`)
            .then(res => res.json())
            .catch(() => null);
          if (geoRes && geoRes.status === "success") {
            resolvedCity = geoRes.city;
            resolvedRegion = geoRes.regionName;
            resolvedCountry = geoRes.countryCode;
          }
        }

        await prisma.deviceSession.create({
          data: {
            userId: user.id,
            ipAddress: realIp,
            browser,
            os,
            city: resolvedCity,
            region: resolvedRegion,
            country: resolvedCountry,
            isActive: true,
            lastLogin: new Date(),
          }
        });
      } catch (e) {
        console.error("Failed to track session", e);
      }
    }

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.cause?.err?.message === "unverified" || error.message === "unverified" || error.message.includes("unverified")) {
        throw new Error("unverified");
      }
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid credentials.");
        default:
          throw new Error("Something went wrong.");
      }
    }
    throw error;
  }
}

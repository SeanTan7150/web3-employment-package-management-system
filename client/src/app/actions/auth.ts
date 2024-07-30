"use server";
import { VerifyLoginPayloadParams, createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { client } from "../../lib/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const privateKey = process.env.NEXT_PUBLIC_THIRDWEB_ADMIN_PRIVATE_KEY || "";

if (!privateKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_THIRDWEB_ADMIN_PRIVATE_KEY in .env file."
  );
}

const thirdwebAuth = createAuth({
  domain: "localhost:3000" || "",
  adminAccount: privateKeyToAccount({ client, privateKey }),
});

export const generatePayload = thirdwebAuth.generatePayload;

export async function login(payload: VerifyLoginPayloadParams) {
  try {
    const verifiedPayload = await thirdwebAuth.verifyPayload(payload);

    if (verifiedPayload.valid) {
      const jwt = await thirdwebAuth.generateJWT({
        payload: verifiedPayload.payload,
      });
      cookies().set("jwt", jwt);
      // return redirect("/ethiring");
    }
  } catch (error) {
    console.error("Error during login: ", error);
  }
}

export async function authedOnly(): Promise<boolean> {
  const jwt = cookies().get("jwt");
  if (!jwt?.value) {
    // redirect("/?status=403");
    return false;
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
  if (!authResult.valid) {
    return false;
    // redirect("/?status=403");
  }
  return true;
  // return authResult.parsedJWT;
}

export async function logout() {
  cookies().delete("jwt");
}

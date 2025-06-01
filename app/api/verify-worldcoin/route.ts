// app/api/verify-worldcoin/route.ts
// This is a backend route to verify the World ID proof.
// You would call this from your actual producer registration API endpoint.

import { NextResponse } from "next/server"
import type { IVerifyResponse } from "@worldcoin/idkit"

interface WorldIDResponse {
  nullifier_hash: string;
  success: boolean;
  code?: string;
  detail?: string;
}

export async function POST(request: Request) {
  const { proof, app_id, action, signal, verification_level } = await request.json()

  if (!process.env.NEXT_PUBLIC_WLD_APP_ID || !process.env.WLD_ACTION_NAME) {
    return NextResponse.json({ error: "Worldcoin environment variables not set on server" }, { status: 500 })
  }

  // Ensure the app_id from the frontend matches the one configured on the server
  // This is a basic check; for production, ensure the app_id in the proof also matches.
  if (app_id !== process.env.NEXT_PUBLIC_WLD_APP_ID) {
    return NextResponse.json({ error: "App ID mismatch" }, { status: 400 })
  }

  // Ensure the action from the frontend matches the one configured on the server
  if (action !== process.env.WLD_ACTION_NAME) {
    return NextResponse.json({ error: "Action mismatch" }, { status: 400 })
  }

  const verifyEndpoint = `https://developer.worldcoin.org/api/v1/verify/${process.env.NEXT_PUBLIC_WLD_APP_ID}`

  try {
    const verifyRes = await fetch(verifyEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merkle_root: proof.merkle_root,
        nullifier_hash: proof.nullifier_hash,
        proof: proof.proof,
        verification_level: verification_level, // Send the verification_level from the client
        action: action, // The action ID from your Worldcoin Developer Portal
        signal: signal || "", // The signal if you used one
      }),
    })

    const wldResponse = (await verifyRes.json()) as WorldIDResponse

    if (verifyRes.status === 200 && wldResponse.success) {
      // Proof is valid, and action is verified
      // Here, you can also check wldResponse.nullifier_hash to prevent double registrations if needed
      return NextResponse.json(
        {
          success: true,
          message: "World ID verification successful.",
          nullifier_hash: wldResponse.nullifier_hash,
        },
        { status: 200 },
      )
    } else {
      // Proof is invalid or verification failed
      return NextResponse.json(
        {
          success: false,
          code: wldResponse.code || "verification_failed",
          detail: wldResponse.detail || "Unknown error from World ID.",
          error: "World ID verification failed.",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Error verifying World ID:", error)
    return NextResponse.json({ error: "Internal server error during World ID verification." }, { status: 500 })
  }
}

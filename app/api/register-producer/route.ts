import { NextResponse } from "next/server"
import type { IVerifyResponse } from "@worldcoin/idkit"

export async function POST(request: Request) {
  try {
    const { user, worldcoinProof, producerData } = await request.json()

    // Validate required fields
    if (!user || !worldcoinProof || !producerData) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 })
    }

    if (!producerData.farmName || !producerData.location || !producerData.description) {
      return NextResponse.json({ message: "Missing required producer information." }, { status: 400 })
    }

    // Verify Worldcoin proof
    const verifyEndpoint = `https://developer.worldcoin.org/api/v1/verify/${process.env.NEXT_PUBLIC_WLD_APP_ID}`

    try {
      const verifyRes = await fetch(verifyEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merkle_root: worldcoinProof.merkle_root,
          nullifier_hash: worldcoinProof.nullifier_hash,
          proof: worldcoinProof.proof,
          verification_level: worldcoinProof.verification_level,
          action: process.env.NEXT_PUBLIC_WLD_ACTION_NAME || "producer-registration",
          signal: user.email || "", // Optional: bind to user email
        }),
      })

      const wldResponse = (await verifyRes.json()) as IVerifyResponse

      if (!verifyRes.ok || !wldResponse.success) {
        return NextResponse.json(
          {
            message: "Worldcoin verification failed.",
            error: wldResponse.detail || "Invalid proof",
          },
          { status: 400 },
        )
      }

      // TODO: Check if this nullifier_hash has been used before to prevent duplicate registrations
      // const existingProducer = await db.producer.findUnique({ where: { worldcoinNullifier: wldResponse.nullifier_hash } })
      // if (existingProducer) {
      //   return NextResponse.json({ message: "This World ID has already been used for producer registration." }, { status: 409 })
      // }

      // TODO: Save producer to database
      // const newProducer = await db.producer.create({
      //   data: {
      //     userId: user.id,
      //     email: user.email,
      //     farmName: producerData.farmName,
      //     location: producerData.location,
      //     description: producerData.description,
      //     certifications: producerData.certifications,
      //     contactPhone: producerData.contactPhone,
      //     worldcoinNullifier: wldResponse.nullifier_hash,
      //     status: 'pending', // Requires admin approval
      //     createdAt: new Date(),
      //   },
      // })

      console.log("Producer registration data:", {
        user,
        producerData,
        worldcoinNullifier: (wldResponse as any).nullifier_hash,
      })

      return NextResponse.json(
        {
          message: "Producer registration successful! Your application is pending approval.",
          // producer: { id: newProducer.id, status: newProducer.status }
        },
        { status: 201 },
      )
    } catch (worldcoinError) {
      console.error("Worldcoin verification error:", worldcoinError)
      return NextResponse.json({ message: "Failed to verify World ID. Please try again." }, { status: 500 })
    }
  } catch (error) {
    console.error("Producer registration API error:", error)
    return NextResponse.json({ message: "An internal server error occurred." }, { status: 500 })
  }
}

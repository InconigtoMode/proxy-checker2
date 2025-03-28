import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const ipPort = searchParams.get("ipPort")

  if (!ipPort) {
    return NextResponse.json({ error: "IP:PORT parameter is required" }, { status: 400 })
  }

  try {
    // Make request to the proxy checking API
    const response = await fetch(`https://proxyip.biz.id/${ipPort}`)

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error checking proxy:", error)
    return NextResponse.json({ error: "Failed to check proxy", details: String(error) }, { status: 500 })
  }
}


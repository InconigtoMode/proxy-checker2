import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { ipPort: string[] } }) {
  try {
    // Get the IP:PORT from the URL path
    const ipPortPath = params.ipPort.join("/")

    // Make request to the proxy checking API
    const response = await fetch(`https://proxyip.biz.id/${ipPortPath}`)

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`)
    }

    // Get the response data
    const data = await response.json()

    // Return the data directly
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error checking proxy:", error)
    return NextResponse.json({ error: "Failed to check proxy", details: String(error) }, { status: 500 })
  }
}


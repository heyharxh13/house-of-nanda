import { NextResponse } from "next/server"
import { products } from "@/lib/data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")

  const filtered = category && category !== "all"
    ? products.filter((p) => p.category === category)
    : products

  return NextResponse.json(filtered)
}

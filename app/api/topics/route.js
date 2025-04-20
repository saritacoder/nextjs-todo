import connectMongoDB from "@/libs/mongodb"
import Topic from "@/models/topic"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request) {
  try {
    const { title, description } = await request.json()

    // Validate input
    if (!title || !description) {
      return NextResponse.json({ message: "Title and description are required" }, { status: 400 })
    }

    await connectMongoDB()
    await Topic.create({ title, description })

    return NextResponse.json({ message: "Topic created successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error creating topic:", error)
    return NextResponse.json({ message: "Failed to create topic" }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectMongoDB()
    const topics = await Topic.find().sort({ createdAt: -1 })

    return NextResponse.json({ topics })
  } catch (error) {
    console.error("Error fetching topics:", error)
    return NextResponse.json({ message: "Failed to fetch topics" }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id")

    if (!id) {
      return NextResponse.json({ message: "Topic ID is required" }, { status: 400 })
    }

    await connectMongoDB()
    const deletedTopic = await Topic.findByIdAndDelete(id)

    if (!deletedTopic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Topic deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting topic:", error)
    return NextResponse.json({ message: "Failed to delete topic" }, { status: 500 })
  }
}




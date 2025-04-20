import connectMongoDB from "@/libs/mongodb"
import Topic from "@/models/topic"
import { NextResponse } from "next/server"

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const { newTitle: title, newDescription: description } = await request.json()

    // Validate input
    if (!title || !description) {
      return NextResponse.json({ message: "Title and description are required" }, { status: 400 })
    }

    await connectMongoDB()
    const updatedTopic = await Topic.findByIdAndUpdate(id, { title, description }, { new: true })

    if (!updatedTopic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Topic updated successfully", topic: updatedTopic }, { status: 200 })
  } catch (error) {
    console.error("Error updating topic:", error)
    return NextResponse.json({ message: "Failed to update topic" }, { status: 500 })
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params

    await connectMongoDB()
    const topic = await Topic.findById(id)

    if (!topic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 })
    }

    return NextResponse.json({ topic }, { status: 200 })
  } catch (error) {
    console.error("Error fetching topic:", error)
    return NextResponse.json({ message: "Failed to fetch topic" }, { status: 500 })
  }
}







// import connectMongoDB from "@/libs/mongodb";
// import Topic from "@/models/topic";
// import { NextResponse } from "next/server";

// export async function PUT(request, { params }) {
//   const { id } = params;
//   const { newTitle: title, newDescription: description } = await request.json();
//   await connectMongoDB();
//   await Topic.findByIdAndUpdate(id, { title, description });
//   return NextResponse.json({ message: "Topic updated" }, { status: 200 });
// }

// export async function GET(request, { params }) {
//   const { id } = params;
//   await connectMongoDB();
//   const topic = await Topic.findOne({ _id: id });
//   return NextResponse.json({ topic }, { status: 200 });
// }
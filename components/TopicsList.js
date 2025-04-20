import Link from "next/link"
import RemoveBtn from "./RemoveBtn"
import { HiPencilAlt } from "react-icons/hi"
import LoadingSpinner from "./LoadingSpinner"
import { Suspense } from "react"
import { createApiUrl } from "@/utils/api"

const getTopics = async () => {
  try {
    // Use the utility function to create the API URL
    const url = createApiUrl("/api/topics")

    const res = await fetch(url, {
      cache: "no-store",
      next: { revalidate: 0 },
    })

    if (!res.ok) {
      throw new Error("Failed to fetch topics")
    }

    return res.json()
  } catch (error) {
    console.log("Error loading topics: ", error)
    return { topics: [] }
  }
}

function TopicsListContent({ topics }) {
  return (
    <>
      {topics.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">No topics found. Create your first topic!</p>
          <Link href="/addTopic" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Add New Topic
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-1">
          {topics.map((t) => (
            <div
              key={t._id}
              className="p-6 border border-slate-300 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-2xl mb-2">{t.title}</h2>
                  <div className="text-gray-600">{t.description}</div>
                </div>

                <div className="flex gap-2 items-center">
                  <RemoveBtn id={t._id} />
                  <Link href={`/editTopic/${t._id}`} className="text-blue-500 hover:text-blue-700">
                    <HiPencilAlt size={24} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default async function TopicsList() {
  const data = await getTopics()
  const topics = data?.topics || []

  return (
    <Suspense
      fallback={
        <div className="py-10">
          <LoadingSpinner size="large" />
        </div>
      }
    >
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Topics</h1>
        <Link href="/addTopic" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add New Topic
        </Link>
      </div>
      <TopicsListContent topics={topics} />
    </Suspense>
  )
}



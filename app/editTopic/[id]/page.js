import EditTopicForm from "@/components/EditTopicForm"
import { Suspense } from "react"
import LoadingSpinner from "@/components/LoadingSpinner"
import { createApiUrl } from "@/utils/api"

const getTopicById = async (id) => {
  try {
    // Use the utility function to create the API URL
    const url = createApiUrl(`/api/topics/${id}`)

    const res = await fetch(url, {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error("Failed to fetch topic")
    }

    return res.json()
  } catch (error) {
    console.log(error)
    return { topic: { title: "", description: "" } } // Provide default values
  }
}

export default async function EditTopic({ params }) {
  const { id } = params
  const data = await getTopicById(id)
  const topic = data?.topic || { title: "", description: "" } // Safely handle undefined data
  const { title, description } = topic

  return (
    <Suspense
      fallback={
        <div className="py-10">
          <LoadingSpinner size="large" />
        </div>
      }
    >
      <EditTopicForm id={id} title={title} description={description} />
    </Suspense>
  )
}




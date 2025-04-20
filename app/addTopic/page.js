"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function AddTopic() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.")
      return
    }

    try {
      setIsSubmitting(true)
      // Client-side can use relative URLs
      const res = await fetch(`/api/topics?t=${Date.now()}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      })

      if (res.ok) {
        // Clear the form
        setTitle("")
        setDescription("")

        // Force a cache invalidation and refresh
        router.refresh()

        // Navigate back to home page
        router.push("/")
      } else {
        const errorData = await res.json()
        throw new Error(errorData.message || "Failed to create a topic")
      }
    } catch (error) {
      console.log(error)
      setError(error.message || "Failed to create topic. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Topic</h1>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Topic Title
          </label>
          <input
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            placeholder="Enter topic title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Topic Description
          </label>
          <textarea
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            placeholder="Enter topic description"
          />
        </div>

        <div className="flex justify-between items-center mt-2">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            disabled={isSubmitting}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 font-bold text-white py-2 px-6 rounded flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="small" />
                <span>Adding...</span>
              </>
            ) : (
              "Add Topic"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}





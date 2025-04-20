"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import LoadingSpinner from "./LoadingSpinner"

export default function EditTopicForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!newTitle.trim() || !newDescription.trim()) {
      setError("Title and description are required.")
      return
    }

    try {
      setIsSubmitting(true)
      // Client-side can use relative URLs
      const res = await fetch(`/api/topics/${id}?t=${Date.now()}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      })

      if (res.ok) {
        router.push("/")
        router.refresh()
      } else {
        const errorData = await res.json()
        throw new Error(errorData.message || "Failed to update topic")
      }
    } catch (error) {
      console.log(error)
      setError(error.message || "Failed to update topic. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Topic</h1>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Topic Title
          </label>
          <input
            id="title"
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
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
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription}
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
            className="bg-blue-600 hover:bg-blue-700 font-bold text-white py-2 px-6 rounded flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="small" />
                <span>Updating...</span>
              </>
            ) : (
              "Update Topic"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}





// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function EditTopicForm({ id, title, description }) {
//   const [newTitle, setNewTitle] = useState(title);
//   const [newDescription, setNewDescription] = useState(description);

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({ newTitle, newDescription }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to update topic");
//       }

//       router.refresh();
//       router.push("/");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//       <input
//         onChange={(e) => setNewTitle(e.target.value)}
//         value={newTitle}
//         className="border border-slate-500 px-8 py-2"
//         type="text"
//         placeholder="Topic Title"
//       />

//       <input
//         onChange={(e) => setNewDescription(e.target.value)}
//         value={newDescription}
//         className="border border-slate-500 px-8 py-2"
//         type="text"
//         placeholder="Topic Description"
//       />

//       <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
//         Update Topic
//       </button>
//     </form>
//   );
// }

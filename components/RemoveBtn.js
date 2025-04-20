"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HiOutlineTrash } from "react-icons/hi"
import LoadingSpinner from "./LoadingSpinner"

export default function RemoveBtn({ id }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const removeTopic = async () => {
    const confirmed = confirm("Are you sure you want to delete this topic?")

    if (confirmed) {
      try {
        setIsDeleting(true)

        // Client-side can use relative URLs
        const res = await fetch(`/api/topics?id=${id}&t=${Date.now()}`, {
          method: "DELETE",
          cache: "no-store",
        })

        if (res.ok) {
          // Force a cache invalidation and refresh
          router.refresh()
        } else {
          throw new Error("Failed to delete topic")
        }
      } catch (error) {
        console.log(error)
        alert("Failed to delete topic. Please try again.")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <button
      onClick={removeTopic}
      className="text-red-500 hover:text-red-700 disabled:text-gray-400"
      disabled={isDeleting}
      aria-label="Delete topic"
    >
      {isDeleting ? <LoadingSpinner size="small" /> : <HiOutlineTrash size={24} />}
    </button>
  )
}






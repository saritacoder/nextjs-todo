"use client"

import { useEffect, useState } from "react"

export default function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const errorHandler = (error) => {
      console.error("Error caught by error boundary:", error)
      setError(error)
      setHasError(true)
    }

    window.addEventListener("error", errorHandler)

    return () => {
      window.removeEventListener("error", errorHandler)
    }
  }, [])

  if (hasError) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-md my-4">
        <h2 className="text-lg font-bold text-red-700 mb-2">Something went wrong</h2>
        <p className="text-red-600 mb-2">{error?.message || "An unexpected error occurred"}</p>
        <button
          onClick={() => {
            setHasError(false)
            setError(null)
            window.location.href = "/"
          }}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Home Page
        </button>
      </div>
    )
  }

  return children
}

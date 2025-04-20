export default function LoadingSpinner({ size = "medium" }) {
    const sizeClasses = {
      small: "w-4 h-4 border-2",
      medium: "w-8 h-8 border-3",
      large: "w-12 h-12 border-4",
    }
  
    return (
      <div className="flex justify-center items-center">
        <div
          className={`${sizeClasses[size]} border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin`}
        ></div>
      </div>
    )
  }
  
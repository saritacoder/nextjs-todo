import TopicsList from "@/components/TopicsList"
import { Suspense } from "react"
import LoadingSpinner from "@/components/LoadingSpinner"

// This ensures the page is dynamic and not statically generated
export const dynamic = "force-dynamic"
export const revalidate = 0

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="py-10">
          <LoadingSpinner size="large" />
        </div>
      }
    >
      <TopicsList />
    </Suspense>
  )
}




// import TopicsList from "@/components/TopicsList";


// export default function Home() {
//   return (
//     <div>
//        <TopicsList />
//     </div>
//   );
// }

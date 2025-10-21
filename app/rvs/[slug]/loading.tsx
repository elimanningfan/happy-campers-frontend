import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="bg-gray-50 py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="h-4 bg-gray-200 rounded w-64" />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Back link skeleton */}
          <div className="h-4 bg-gray-200 rounded w-32 mb-6" />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Image skeleton */}
            <div>
              <div className="aspect-[4/3] bg-gray-200 rounded-lg" />
              <div className="mt-4 grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-[4/3] bg-gray-200 rounded-md" />
                ))}
              </div>
            </div>

            {/* Details skeleton */}
            <div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-10 bg-gray-200 rounded w-40" />

                {/* Specs skeleton */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded" />
                  ))}
                </div>

                {/* Buttons skeleton */}
                <div className="flex gap-4 mt-8">
                  <div className="flex-1 h-12 bg-gray-200 rounded" />
                  <div className="h-12 w-40 bg-gray-200 rounded" />
                </div>

                {/* Highlights skeleton */}
                <div className="mt-8 p-6 bg-gray-100 rounded-lg">
                  <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-4 bg-gray-200 rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional info skeleton */}
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 p-6 bg-gray-100 rounded-lg">
              <div className="h-6 bg-gray-200 rounded w-40 mb-4" />
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                    <div className="h-3 bg-gray-200 rounded" />
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

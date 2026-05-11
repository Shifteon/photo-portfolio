import { getCollection } from "@portfolio/api";
import { PhotoGrid } from "@portfolio/ui";
import { Collection, Photo } from "@portfolio/types";

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  let photos: Photo[] = [];
  let error = null;

  try {
    const response = await getCollection("home");

    // Check if response is okay
    if (!response.ok) {
      // If 404, it might just be empty, or not created yet. 
      // We will just show empty state.
      console.warn("Home collection fetch failed:", response.status, await response.text());
    } else {
      const collection: Collection = await response.json();
      console.log(collection);

      if (collection && collection.photos) {
        photos = collection.photos;
      }
    }

  } catch (e) {
    console.error("Error fetching home collection:", e);
    error = "Failed to load gallery.";
  }

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      <header>
        <div className="border-b border-on-surface-variant">
          <h1 className="text-4xl md:text-6xl p-1 pb-0">
            Benjamin Wyatt
            <span className="text-2xl text-on-surface-variant ml-1"> Photography</span>
          </h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center w-full">
        <div className="w-full max-w-[1600px] p-2">
          {error ? (
            <div className="text-center py-20 text-error">
              <p>Error fetching photos</p>
            </div>
          ) : photos.length > 0 ? (
            <PhotoGrid photos={photos} targetColumns={3} />
          ) : (
            <div className="text-center py-20 text-on-surface-variant">
              <p className="text-lg">No photos found.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-on-surface-variant">
        <p>&copy; {new Date().getFullYear()} Benjamin Wyatt. All rights reserved.</p>
      </footer>
    </div>
  );
}

import { getCollection } from "@portfolio/api";
import { PhotoGrid } from "@portfolio/ui";
import { Header } from "../components/Header";
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
      <Header />

      <main className="flex-1 flex flex-col items-center w-full px-4 py-8 md:py-12">
        <div className="w-full max-w-[1600px]">
          {error ? (
            <div className="text-center py-20 text-error">
              <p>{error}</p>
            </div>
          ) : photos.length > 0 ? (
            <PhotoGrid photos={photos} targetColumns={3} />
          ) : (
            <div className="text-center py-20 text-on-surface-variant">
              <p className="text-lg">No photos found in the Home collection.</p>
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

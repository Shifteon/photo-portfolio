import { getCollections, getAllPhotos, getCollection } from "@portfolio/api";
import { updateCollection } from "@portfolio/api";
import { Photo, Collection, CollectionFormSchema } from "@portfolio/types";
import CollectionForm from "../../_components/CollectionForm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Define strict ActionState to match useActionState expectation
interface ActionState {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditCollectionPage({ params }: PageProps) {
  const { slug } = await params;

  // We need to fetch the specific collection by slug.
  // Currently getCollections returns all. We might need a getCollectionBySlug or just find it.
  const collectionData = await getCollection(slug);
  const collection: Collection = await collectionData.json();

  if (!collection) {
    return <div>Collection not found</div>;
  }

  const photoData = await getAllPhotos();
  const photos: Photo[] = await photoData.json();

  async function updateCollectionAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
    'use server';

    const rawData = {
      name: formData.get('name'),
      slug: formData.get('slug'),
      order: Number(formData.get('order')),
      coverPhotoId: formData.get('coverPhotoId') ? Number(formData.get('coverPhotoId')) : undefined,
      photoIds: formData.getAll('photoIds').map(Number),
    };

    const validatedFields = CollectionFormSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    try {
      await updateCollection(collection!.slug, validatedFields.data); // Use original slug to identify
      revalidatePath('/collections');
      return {
        success: true,
        message: 'Collection updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update collection',
      };
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Edit Collection</h1>
      <CollectionForm photos={photos} initialData={collection} action={updateCollectionAction} />
    </div>
  );
}

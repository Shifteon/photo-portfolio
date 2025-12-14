import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '../utils/getSupabaseClient';
import { Collection, CollectionSchema } from '@portfolio/types';

export default async function getPhotoCollection(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const collectionSlug = searchParams.get('collectionSlug');

    if (!collectionSlug) {
      return NextResponse.json({ error: 'Collection slug is required' }, { status: 400 });
    }

    const supabase = getSupabaseClient();
    const { data: collectionData, error } = await supabase.from('collections') // Start the query on the main collection table
      .select(`
        name,
        slug,
        order,
        cover_photo:cover_photo_id (
          title,
          storage_path,
          width,
          height,
          aspect_ratio
        ),
        photos ( 
          title,
          storage_path,
          width,
          height,
          aspect_ratio
        )
      `)
      .eq('slug', collectionSlug) // Filter by collection slug/ID
      .order('photo_order', { // Assumes a 'photo_order' column exists in the junction table/photos table
        referencedTable: 'photos', // Specify which table to order
        ascending: true
      })
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    if (!collectionData) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    const collection: Collection = CollectionSchema.parse(collectionData);

    return NextResponse.json(collection);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
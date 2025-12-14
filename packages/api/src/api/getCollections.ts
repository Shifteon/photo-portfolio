import { Collection, CollectionSchema } from "@portfolio/types";
import { getSupabaseClient } from "../utils/getSupabaseClient";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/collections
 * @param req 
 * @returns collectionsData
 */
export default async function getCollections(req: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const { data: collectionsData, error } = await supabase.from('collections')
      .select(`
        name,
        slug,
        order,
        cover_photo:cover_photo_id (
          id,
          title,
          storage_path,
          width,
          height,
          aspect_ratio
        )
      `)
      .order('order', { ascending: true });

    if (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    const collections: Collection[] = collectionsData.map(collection => CollectionSchema.parse(collection));
    return NextResponse.json(collections);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};  
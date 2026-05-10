import { NextResponse } from 'next/server';
import getCollectionFromDb from '../db/getCollectionFromDb';

export default async function getCollection(collectionSlug: string) {
  try {
    if (!collectionSlug) {
      return NextResponse.json({ error: 'Collection slug is required' }, { status: 400 });
    }

    const collection = await getCollectionFromDb(collectionSlug);

    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    return NextResponse.json(collection);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
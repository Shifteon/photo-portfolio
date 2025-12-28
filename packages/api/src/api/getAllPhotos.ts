import { NextResponse } from "next/server";
import { getSupabaseClient } from "../utils/getSupabaseClient";
import { PhotoTransformer } from "@portfolio/types";

export default async function getAllPhotos() {
  const supabaseClient = getSupabaseClient();

  const { data: photos, error } = await supabaseClient.from("photos").select("*");
  const photosData = PhotoTransformer.array().parse(photos);

  if (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json({ error: "Error fetching photos" }, { status: 500 });
  }

  return NextResponse.json(photosData, { status: 200 });
}
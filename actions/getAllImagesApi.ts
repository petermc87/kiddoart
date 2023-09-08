"use server";
import db from "@/app/modules/db";
import { ImageType } from "@/models/typings";

export default async function getAllImages() {
  const images: ImageType[] = await db.image.findMany({
    orderBy: { createdAt: "desc" },
  });

  return images;
}

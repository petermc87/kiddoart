"use server";
import db from "@/app/modules/db";
import { Image } from "@/models/typings";

export default async function getAllImages() {
  const images: Image[] = await db.image.findMany({
    orderBy: { createdAt: "desc" },
  });

  return images;
}

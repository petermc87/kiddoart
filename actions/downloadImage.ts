"use server";

import db from "@/app/modules/db";
const cors = require("cors");

export default async function Download(id: string) {
  const image = await db.image.findUnique({
    where: {
      id: id,
    },
  });
  return image;
}

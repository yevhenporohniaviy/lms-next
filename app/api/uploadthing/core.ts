import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handelAuth = () => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized")
  return {userId}
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(() => handelAuth())
    .onUploadComplete(() => { }),
  courseAttachments: f(['text', 'video', 'image', 'audio', 'pdf'])
    .middleware(() => handelAuth())
    .onUploadComplete(() => { }),
  chpterVideo: f({ video: { maxFileCount: 1, maxFileSize: '512GB' } })
    .middleware(() => handelAuth())
    .onUploadComplete(() => { })
  
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

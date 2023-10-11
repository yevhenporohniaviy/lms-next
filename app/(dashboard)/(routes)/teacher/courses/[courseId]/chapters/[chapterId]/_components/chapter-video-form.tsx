"use client"
import * as z from "zod";
import axios from 'axios'

import { Button } from "@/components/ui/button";

import MuxPlayer from '@mux/mux-player-react'
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";  
import { useRouter } from "next/navigation";

import { Course, MuxData } from "@prisma/client";
import FileUpload from "@/components/file-upload";

interface ChapterVideoFormProps {
  initialData: Course & {muxData?: MuxData | null};
  courseId: string;
  chapterId: string
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});
const ChapterVideoForm = ({ initialData, courseId, chapterId }: ChapterVideoFormProps) => {
  const router = useRouter();
  const [isEditing, setEditing] = useState(false);
  const toggleEdit = () => {
    setEditing((current) => !current);
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Chapter updated!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md ">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2 ">
            <MuxPlayer
              playbackId={initialData?.muxData?.playbackId || ""}
              
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chpterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Video can take a few minuts to process. Refresh the page if video do not appear.
        </div>
      )}
    </div>
  );
};
 
export default ChapterVideoForm;
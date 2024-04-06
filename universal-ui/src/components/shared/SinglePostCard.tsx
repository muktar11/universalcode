import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from "@/components/ui";
import { multiFormatDateString } from "@/lib/utils";
import { PostValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { FileUploader, Loader } from "@/components/shared";
import { useUpdatePost } from "@/lib/react-query/queries";
import { IUpdatePost } from "@/types";
import { useState } from "react";
import { Button } from "../ui/button";
type PostCardProps = {
  post: Models.Document;
  action: "Create" | "Update";
};

const SinglePostCard = ({ post, action }: PostCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
     
    },
  });

  // Query

  const { mutateAsync: updatePost, isLoading: isLoadingCreate } = useUpdatePost(post._id);

  // Handler
    // Handler
 

    const submitForm = async (value: z.infer<typeof PostValidation>) => {
      try {
        const updatedPost: IUpdatePost = {
          _id: post?._id || "", // Include the _id property
          caption: value.caption,
          imageUrl: post?.imageUrl || "",
          file: value.file,
        }
        const newPost = await updatePost(updatedPost);
      
        if (!newPost) {
          toast({
            title: `${action} post failed. Please try again.`,
          });
        }
        navigate("/");
      } catch (error) {
        console.log(error);
        toast({
          title: `${action} post failed. Please try again.`,
        });
      }
    };
    
    const [showFields, setShowFields] = useState(false);
      const handleUpdateClick = () => {
        setShowFields(true);
      };
    
    
 
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
         
            <img
              src={
                
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
         
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              caption
            </p>
            <div className="flex-center gap-2 text-light-3">
            
            
            </div>
          </div>
        </div>

    
    
      </div>

    
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
         
        </div>
    
        <img
          src={post.image || "/assets/icons/profile-placeholder.svg"}
          alt="post image"
          className="post-card_img"
        />

<div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.$created_at)}
              </p>
            </div>
            <div className="flex justify-between gap-3">
            <Button type="button" size="sm" className="shad-button_primary px-5"  onClick={handleUpdateClick}>Update</Button>
  <Button type="button" size="sm" className="shad-button_primary px-5">Delete</Button>
</div>
{showFields && (

<Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitForm)}
        className="flex flex-col gap-9 w-full  max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

 

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate}>
            {(isLoadingCreate) && <Loader />}
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
)}
    </div>
  );
};

export default SinglePostCard;

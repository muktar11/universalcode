import  { useState } from "react";
import { Models } from "appwrite";
import { Button } from "../ui/button";
import {   useUpdateCourse, useDeleteCourse, 
    } from "@/lib/react-query/queries";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import {  IUpdateCourse, IDeletedCourse} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/components/ui";
import  { CourseValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { FileUploader, Loader } from "@/components/shared";
type CourseCardProps = {
  usercourse: Models.Document;
  course: Models.Document;
  action: "Create" | "Update";
};

const SingleCourseCard = ({  course, action }: CourseCardProps) => {

    const navigate = useNavigate();
    const { toast } = useToast();
    const isWebAdmin = localStorage.getItem("isWebAdmin") === "true";
  
     // Query
   
  
    const form = useForm<z.infer<typeof CourseValidation>>({
      resolver: zodResolver(CourseValidation),
      defaultValues: {
        title: course ? course?.title : "",
        Instructor: course ? course?. Instructor : "",
        language: course ? course?.language : "",
        content: course ? course?.content : "",
        courseduration: course ? course.courseduration : "",
        streamingtime: course ? course?.streamingtime : "",
        startingday: course ? course?.startingday : "",
        endingday: course ? course?.endingday : "",
        
      },
    });

    const { mutateAsync: updateCourse, isLoading: isLoadingCreate } = useUpdateCourse(course._id);

    const handleCourse = async (value: z.infer<typeof CourseValidation>) => {
      // ACTION = UPDATE
  
        const completeCourse: IUpdateCourse = {
          Instructor: value.Instructor,
          title: value.title,
          language: value.language,
          content: value.content,
          courseduration: value.courseduration,
          streamingtime: value.streamingtime,
          startingday: value.startingday,
          endingday: value.endingday,
          file: value.file,
          _id:  course?._id || "",
        
        }
        const CreatedCourse = await updateCourse(completeCourse);
  
        if (!CreatedCourse ) {
          toast({title: `post failed. Please try again.`});
        }
        return navigate(`/explore`);
      }

       // Query
    const { mutateAsync: deleteCourse} = useDeleteCourse(course._id);

      const handleDeleteCourse = async () => {
        try {
          const courseToDelete: IDeletedCourse = {
            _id: course?._id || "",
          }
          
          await deleteCourse(courseToDelete._id); // Pass _id directly to deleteCourse function
          toast({ title: "Course deleted successfully" });
          // Redirect or update UI accordingly
          return navigate(`/access-course`);
        } catch (error) {
          console.error("Error deleting course:", error);
          toast({ title: "Failed to delete course. Please try again later." });
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
            src={"/assets/icons/universal.svg"}
            alt="creator"
            className="w-12 lg:h-12 rounded-full"
          />
          <div className="flex flex-col">
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {" "}
                {course.title}
              </p>
            </div>
            <p className="subtle-semibold lg:small-regular">
              {" "}
              CreatedBy {course.Instructor}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <img
          src={course.image}
          alt="post image"
          className="post-card_img"
        />
      </div>
      <div className="flex items-center gap-3">
        <p className="subtle-semibold lg:small-regular "> {course.content}</p>
      </div>
      <div className="flex items-center gap-3">
        <p className="subtle-semibold lg:small-regular ">
          {" "}
          Language {course?.language}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <p className="subtle-semibold lg:small-regular">
          Course Starting Date {course?.startingday} Course Ending Date{" "}
          {course?.endingday}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <p className="subtle-semibold lg:small-regular">
          Course Duration {course?.courseduration} Class Starting Time{" "}
          {course?.streamingtime}
        </p>
      </div>

      <div className="flex justify-between gap-3">
      {isWebAdmin ? (
        <>
          <Button type="button" size="sm" className="shad-button_primary px-5" onClick={handleUpdateClick}>
            Update
          </Button>
          <Button type="button" size="sm" className="shad-button_primary px-5" onClick={handleDeleteCourse}>
            Delete
          </Button>
        </>
      ) : (
        <Button type="button" size="sm" className="shad-button_primary px-5">
          Register 
        </Button>
      )}
    </div>
{showFields && (
<Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCourse)}
        className="flex flex-col gap-9 w-full  max-w-5xl">

<FormField
          control={form.control}
          name="Instructor"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Instructor</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Title</FormLabel>
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
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Language</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Content</FormLabel>
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
          name="courseduration"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Course Duration </FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        
<FormField
          control={form.control}
          name="streamingtime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Streaming Time</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="startingday"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Starting Day(2024-03-01)</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
          
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="endingday"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Ending Day(2024-03-01)</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
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
                  mediaUrl={course?.file}
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
            {action} Update
          </Button>
        </div>
      </form>
    </Form>
  )}
    </div>
  );
};

export default SingleCourseCard;

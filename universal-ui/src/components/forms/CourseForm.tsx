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
  Button,
  Input,
  Textarea,
} from "@/components/ui";

import  { CourseValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { FileUploader, Loader } from "@/components/shared";
import { useCreateCourse } from "@/lib/react-query/queries";

import {  INewCourse } from "@/types";

type CourseFormProps = {
  course?: Models.Document;
  action: "Create" | "Update";
};

const CourseForm = ({ course, action }:  CourseFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();


   // Query
  const { mutateAsync: createCourse, isLoading: isLoadingCreate } = useCreateCourse();

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
      file: [],
    },
  });

 
  // Handler
  const handleCourse = async (value: z.infer<typeof CourseValidation>) => {
    // ACTION = UPDATE

      const completeCourse: INewCourse = {
        Instructor: value.Instructor, 
        title: value.title, 
        language: value.language, 
        content: value.content, 
        courseduration: value.courseduration, 
        streamingtime: value.streamingtime, 
        startingday: value.startingday, 
        endingday: value.endingday, 
        file: value.file,
      }
      const CreatedCourse = await createCourse(completeCourse);

      if (!CreatedCourse ) {
        toast({title: `post failed. Please try again.`});
      }
      return navigate(`/explore`);
    }
  

  return (
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
            {action} Publish
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CourseForm;


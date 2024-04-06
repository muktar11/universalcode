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
import  { EventValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "@/components/shared";
import { useCreateEvent } from "@/lib/react-query/queries";
import {  INewEvent } from "@/types";
type EventFormProps = {
  event?: Models.Document;
  action: "Create" | "Update";
};

const EventsForm = ({  event, action }: EventFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof EventValidation >>({
    resolver: zodResolver(EventValidation) ,
    defaultValues: {
      title: event ?  event?.title : "",
      startingtime: event ?  event?.startingtime : "",
      endtime: event ?  event?.endtime : "",
      description: event ?  event?.description : "",
      startingday: event ?  event?.startingday : "",
      endingday: event ? event?.endingday : "",
      audience: event ? event?.audience : "",
      class_link: event ? event.class_link: "",
      class_password:  event ? event.class_password: "",
    },
  });

  // Query
  const { mutateAsync: createEvent, isLoading: isLoadingCreate } =
    useCreateEvent();
    // Handler
    const handleSubmit = async (value: z.infer<typeof EventValidation>) => {
      // ACTION = CREATE
      const newEvent: INewEvent = {
        title: value.title,
        startingtime: value.startingtime,
        endtime: value.endtime,
        description: value.description,
        startingday: value.startingday,
        endingday: value.endingday,
        audience: value.audience,
        class_link: value.class_link,
        class_password: value.class_password,
        id: "",
        no_of_notifications: ""
      };

      const CreateEvent = await createEvent(newEvent)
    
      if (!CreateEvent) {
        toast({
          title: `post failed. Please try again.`,
        });
      }
      navigate("/event");
    };
    

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-9 w-full  max-w-5xl">

<FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Title</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startingtime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">starting Time</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="endtime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Ending Time</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Description</FormLabel>
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
          name="startingday"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Starting Day (2024-03-01)</FormLabel>
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
              <FormLabel className="shad-form_label">Ending Day(2024-03-07)</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="audience"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Audience ID</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="class_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Class Link</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

     

<FormField
          control={form.control}
          name="class_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Class Password</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
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
            disabled={isLoadingCreate || isLoadingCreate}>
            {(isLoadingCreate || isLoadingCreate) && <Loader />}
            {action} Publish
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventsForm;


import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import  {useState } from "react";
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
import {  useUpdateEvent } from "@/lib/react-query/queries";
import {  IUpdateEvent } from "@/types";

type EventsCardProps = {
    event: Models.Document;
    action: "Create" | "Update";
};

const EventEditCard = ({ event, action }: EventsCardProps) => {
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
      audience: event ? event?.audience : ""
    },
  });

  // Query
  const { mutateAsync: updateEvent, isLoading: isLoadingCreate } = useUpdateEvent();
    // Handler
    const handleSubmit = async (value: z.infer<typeof EventValidation>) => {
      // ACTION = CREATE
      const newEvent: IUpdateEvent = {
        id: event.id,
        title: value.title,
        startingtime: value.startingtime,
        endtime: value.endtime,
        description: value.description,
        startingday: value.startingday,
        endingday: value.endingday,
        audience: value.audience,
        class_link: value.class_link,
        class_password: value.class_password,
      };

      const CreateEvent = await updateEvent(newEvent)
    
      if (!CreateEvent) {
        toast({
          title: `post failed. Please try again.`,
        });
      }
      navigate("/");
    };
    const [showFields, setShowFields] = useState(false);


    const handleUpdateClick = () => {
      setShowFields(!showFields);
    };

  
  return (
    <div className="post-card">
      <div className="flex-between">
            <div className="flex items-center gap-3">
            <img src={"/assets/icons/profile-placeholder.svg"} alt="creator" className="w-12 lg:h-12 rounded-full"/>

              <div className="flex flex-col">
              <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular ">  {event.title}</p>
              </div>
           
              </div>
            </div>  
      </div>

                
                  <div className="flex items-center gap-3">
                    <p className="subtle-semibold lg:small-regular "> Class {event.audience}</p>
                  </div>
                  <div className="flex items-center gap-3">      
                    <p className="subtle-semibold lg:small-regular">Course Starting Date {event.startingday} Course Ending Date {event.endingday}</p>
                  </div>
          
                  <div className="flex items-center gap-3">      
                    <p className="subtle-semibold lg:small-regular">Course Starting Time {event.startingtime} Class Ending Time {event.streamingtime}</p>
              
                    </div>
                    <div className="flex justify-between gap-3">
  <Button type="button" size="sm" className="shad-button_primary px-5"  onClick={handleUpdateClick}>Update</Button>
  <Button type="button" size="sm" className="shad-button_primary px-5">Delete</Button>
</div>    
{showFields && (
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
              <FormLabel className="shad-form_label">Starting Day </FormLabel>
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
              <FormLabel className="shad-form_label">Ending Day</FormLabel>
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
              <FormLabel className="shad-form_label">Audience</FormLabel>
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
      )}
    </div>
  );
};

export default EventEditCard;

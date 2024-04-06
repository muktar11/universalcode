import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import 'react-international-phone/style.css';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
} from "@/components/ui";
import { IUpdateCourseValidation  } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import {  PdfFileUploader, Loader } from "@/components/shared";
import { usePublishBookAccount } from "@/lib/react-query/queries";
import {  IPublishBookUser,  } from "@/types";

type PostFormProps = {
  book?: Models.Document;
  action: "Create" | "Update";
};

const BookForm = ({book, action }: PostFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof IUpdateCourseValidation>>({
    resolver: zodResolver(IUpdateCourseValidation),
    defaultValues: {
      audience:book ? book?.audience : "",
      caption:book ? book?.caption  : "",
      Book_imageUrl:book ? book?.Book_imageUrl  : [],
    },
  });

  // Query
  const { mutateAsync: publishBookAccount, isLoading: isLoadingCreate } =
  usePublishBookAccount();

  // Handler
    // Handler
    const submitForm = async (book: z.infer<typeof IUpdateCourseValidation>) => {
        try {
          const newBook: IPublishBookUser  = {
            audience: book.audience,
            caption: book.caption,
            Book_imageUrl: book.Book_imageUrl,
          
          }
            const newUser = await publishBookAccount(newBook);
            console.log('newuser', newUser)
            if (newUser) {
              form.reset();
              toast({ title: "Registeration Successful." });
              navigate("/");
            } else {
              toast({ title: "Registeration failed. Please try again." });
            }
          } catch (error) {
            console.log({ error });
          }
        };
    
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitForm)}
        className="flex flex-col gap-9 w-full  max-w-5xl">
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
          <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />


             



<FormField
          control={form.control}
          name="Book_imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Book imageUrl</FormLabel>
              <FormControl>
                <PdfFileUploader
                  fieldChange={field.onChange}
                  mediaUrl={book?.Book_imageUrl}
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
            {action} Create 
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BookForm;

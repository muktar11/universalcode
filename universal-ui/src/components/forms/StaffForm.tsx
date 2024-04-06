import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from 'react-international-phone';
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
import { SignupStaffValidation  } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { FileUploader, PdfFileUploader, Loader } from "@/components/shared";
import { useCreateStaffUserAccount } from "@/lib/react-query/queries";
import {  IStaffUser } from "@/types";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const StaffForm = ({post, action }: PostFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof SignupStaffValidation>>({
    resolver: zodResolver(SignupStaffValidation),
    defaultValues: {
        first_name: post ? post?.first_name : "",
        last_name:  post ? post?.last_name  : "",
        email:  post ? post?.email  : "",
        phone:  post ? post?.phone  : "",
        birthday:  post ? post?.birthday  : "",
        bio:  post ? post?.bio  : "",
        extracurricular: post ? post?.extracurricular :  "",
        address:  post ? post?.address :  "",
        mda_imageUrl :  post ? post?.mda_imageUrl  : [],
        photo_imageUrl : post ? post?.photo_imageUrl  : [],
        school_credential_imageUrl :  post ? post?.school_credential_imageUrl  : [],
        terms_and_agreement_imageUrl :  post ? post?.terms_and_agreement_imageUrl  : [],
       
    },
  });

  // Query
  const { mutateAsync: createUserStaff, isLoading: isLoadingCreate } =
  useCreateStaffUserAccount();

  // Handler
    // Handler
    const submitForm = async (user: z.infer<typeof SignupStaffValidation>) => {
        try {
          const newStaff: IStaffUser = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            birthday: user.birthday,
            bio: user.bio,
            extracurricular: user.extracurricular,
            address: user.address,
            mda_imageUrl: user.mda_imageUrl,
            photo_imageUrl: user.photo_imageUrl,
            school_credential_imageUrl: user.school_credential_imageUrl,
            terms_and_agreement_imageUrl: user.terms_and_agreement_imageUrl,
            _id: "",
            emailfield: ""
          }
            const newUser = await createUserStaff(newStaff);
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
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">First Name</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Last Name</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Email</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Phone(+..)</FormLabel>
              <FormControl>
              <PhoneInput              
    {...field}
    placeholder="Enter phone number"
    className="shad-input"
    value={field.value ?? '' as string} // Type assertion to explicitly treat value as string
  
/>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Birthday</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Address</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Bio</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="extracurricular"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Extracurricular</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="photo_imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.photo_imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />


        
<FormField
          control={form.control}
          name="school_credential_imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">School Credential</FormLabel>
              <FormControl>
                <PdfFileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.school_credentials_imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />


            
<FormField
          control={form.control}
          name="mda_imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">MDA Ageement</FormLabel>
              <FormControl>
                <PdfFileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.mda_imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        
        
<FormField
          control={form.control}
          name="terms_and_agreement_imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Terms and Agreement</FormLabel>
              <FormControl>
                <PdfFileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.terms_and_agreement_imageUrl }
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

export default StaffForm;

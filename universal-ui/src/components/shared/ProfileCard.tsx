import { Models } from "appwrite";
import {  useGetRecentProfiles } from "@/lib/react-query/queries";
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
} from "@/components/ui"
import { IUpdateProfilePicValidation, UpdatePasswordValidation} from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { FileUploader, Loader } from "@/components/shared";
import { useUpdateProfilePic, useUpdatePassword } from "@/lib/react-query/queries";
import * as z from "zod";
import { IUpdateProfilePic } from "@/types";


type ProfileFormProps = {
  profiles?: Models.Document;
  action: "Create" | "Update";
};



const ProfileCard = ({ profiles}: ProfileFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof IUpdateProfilePicValidation>>({
    resolver: zodResolver(IUpdateProfilePicValidation),
    defaultValues: {
      caption: profiles ? profiles.caption: "new caption",
      file: [],
    },
  });

  const UpdatePasswordform = useForm<z.infer<typeof UpdatePasswordValidation>>({
    resolver: zodResolver(UpdatePasswordValidation),
    defaultValues: {
      email: profiles ? profiles?.email : "",
      new_password: profiles ? profiles?.new_password : "",
      confirm_password: profiles ? profiles?.confirm_password : "",
    },
  });

  // Query
  const { mutateAsync: updatePassword, isLoading: isLoadingCreate } = useUpdatePassword();
  const { mutateAsync: UpdateProfilePic, isLoading: isLoadingUpdate } = useUpdateProfilePic();
 

  // Handler
  const handleSubmitProfilePic = async (value: z.infer<typeof IUpdateProfilePicValidation>) => {
    // ACTION = UPDATE
      const updateprofilepic: IUpdateProfilePic = {
        caption: value.caption,
        file: value.file,
      }

      const UpdateProfilePics = await UpdateProfilePic(updateprofilepic)
    

      if (!UpdateProfilePics) {
        toast({
          title: "post failed. Please try again.",
        });
      }
    navigate("/profile/");
  };


   // Handler
   const handleSubmit = async (value: z.infer<typeof UpdatePasswordValidation>) => {
    // ACTION = UPDATE
      const updatedPassword = await updatePassword({
        email: value.email, 
        new_password: value.new_password, 
        confirm_password: value.confirm_password,
      });

      if (!updatedPassword) {
        toast({
          title: "post failed. Please try again.",
        });
      }
    navigate("/profile/");
  };


  
  const { data: profile} = useGetRecentProfiles();
  
  if (!profile) {
    return (
      <div className="post-card">
        <p>Loading profile...</p> {/* Or display an appropriate loading message */}
      </div>
    );
  }

  return (
    <div>
        <div className="post-card">
            <div className="flex-between">
              <div className="flex items-center gap-5">
                <img src={profile.profile_imageUrl || "/assets/icons/profile-placeholder.svg"} alt="creator" className="w-12 lg:h-12 rounded-full"/>
                <div className="flex flex-col">
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular"> </p>
                  </div>
                  <div className="flex-center gap-2 ">
                    <p className="subtle-semibold lg:small-regular"> Name {profile.first_name} {profile.last_name} 
                     Phone {profile.phone}  Gender {profile.gender} 
                     Email {profile.email} UniAddress {profile.emailfield} Country {profile.address}  </p>
                     
                  </div>
                </div>
              </div>  
            </div>
            <div className="flex items-center gap-3">
              <p className="subtle-semibold lg:small-regular"></p> <p className="subtle-semibold lg:small-regular">  </p>
            </div>
    </div>
    
    <div>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitProfilePic)}
        className="flex flex-col gap-9 w-full  max-w-5xl">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add  Profile Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={profile?.imageUrl}
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
            disabled={isLoadingUpdate}>
            {(isLoadingUpdate) && <Loader />}
            Update Profile 
          </Button>
        </div>
      </form>
    </Form>
    </div>



    <div>
    <Form {...UpdatePasswordform}>
      <form
        onSubmit={UpdatePasswordform.handleSubmit(handleSubmit)}
        className="flex flex-col gap-9 w-full  max-w-5xl">

<FormField
          control={UpdatePasswordform.control}
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
          control={UpdatePasswordform.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Password</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

<FormField
          control={UpdatePasswordform.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Confirm Password</FormLabel>
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
            disabled={isLoadingCreate}>
            {(isLoadingCreate) && <Loader />}
             Update Password 
          </Button>
        </div>
      </form>
    </Form>
    </div>

     
    </div>
  );
};


export default ProfileCard;

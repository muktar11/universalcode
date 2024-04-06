import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useToast } from "@/components/ui/use-toast";

import { useCreateUserAccount } from "@/lib/react-query/queries";
import { SignupValidation } from "@/lib/validation";
import { INewStudentUser } from "@/types";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      first_name: "",
      last_name: "",
      sales_person_id: "",
      email: "",
      gender:"",
      phone:"",
      address:"",
      password: "",
      password2: "",
    },
  });

  // Queries
  const { mutateAsync: createUserAccount} = useCreateUserAccount();
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    try {
      const createUser: INewStudentUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        password: user.password,
        password2: user.password2,
        sales_person_id: user.sales_person_id,
      };
  
      const registrationSuccessful = await createUserAccount(createUser);
  
      if (registrationSuccessful) {
        // If registration is successful, redirect to the sign-in page
        toast({ title: "Registration Successful. Please check your email." });
        navigate("/sign-in");
      } else {
        // If registration is not successful, show an error message
        toast({ title: "Registration failed. Please try again." });
      }
    } catch (error) {
      console.log({ error });
    }
  };
  

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
     
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create your student account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use uniset, Please enter your details
        </p>


        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-5 w-full mt-4">
   
  <FormField
    control={form.control}
    name="first_name"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="shad-form_label">First Name</FormLabel>
        <FormControl>
          <Input type="text" className="shad-input" {...field} />
        </FormControl>
        <FormMessage />
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
        <FormMessage />
      </FormItem>
    )}
  />

<FormField
    control={form.control}
    name="sales_person_id"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="shad-form_label">SPID</FormLabel>
        <FormControl>
          <Input type="text" className="shad-input" {...field} />
        </FormControl>
        <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Phone</FormLabel>
                <FormControl>
                  {/* Use PhoneInput from react-phone-number-input */}
                  <PhoneInput              
    {...field}
    placeholder="Enter phone number"
    className="shad-input"
    value={field.value ?? '' as string} // Type assertion to explicitly treat value as string
  
/>

                </FormControl>
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="password2"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-isSigningInUserbutton_primary">
        
            
              Sign Up
            
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2 mb-10">
  Already have an account?
  <Link
    to="/sign-in"
    className="text-primary-500 text-small-semibold ml-1">
    Log in
  </Link>
</p>

        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
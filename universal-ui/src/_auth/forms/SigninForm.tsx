import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";
import { INewLoginUser } from "@/types";
import { SigninValidation } from "@/lib/validation";
import { useSignInAccount } from "@/lib/react-query/queries";


const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();


  // Query
  const { mutateAsync: signInAccount, isLoading } = useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    try {
      // Attempt to sign in
      const completeUser: INewLoginUser = {
        email: user.email,
        password: user.password,
      };
      const accessToken = await signInAccount(completeUser);
      if (accessToken !== null) { // Check if accessToken is not null
        // If access token exists, reset form, show success message, and navigate to home page
        form.reset();
        toast({ title: "Login Successful." });
        navigate("/");
      } else {
        // If access token is null, show an error message
        toast({ title: "Login failed. Please try again." });
      }
    } catch (error) {
      // If any error occurs during sign in, log the error and show an error message
      console.error("Error signing in:", error);
      toast({ title: "Login failed. Please try again." });
    }
  };
  
  
  

  

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
       
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details.
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4">
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

          <Button type="submit" className="shad-button_primary">
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Log in"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;

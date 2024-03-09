import React, { useState, useRef } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { useGetStudentUser } from "@/lib/react-query/queries";
import { IStaffUser, IUpdateStudentUser } from "@/types";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
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
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { UpdateStudentValidation  } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { FileUploader, PdfFileUploader, Loader } from "@/components/shared";
import { useUpdateUserStudent } from "@/lib/react-query/queries";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

export function HomeTable({post, action }: PostFormProps) {
  const { isLoading, isError, data: staff } = useGetStudentUser();
  const [showModal, setShowModal] = useState(false);
  const [selectedStaffMember, setSelectedStaffMember] = useState<IStaffUser | null>(null);
  const modalRef = useRef(null);

  const handleColumnClick = (staffMember: IStaffUser) => {
    setSelectedStaffMember(staffMember);
    setShowModal(true);
  };

  const handleClickOutside = (event: { target: any; }) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;




  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof UpdateStudentValidation>>({
    resolver: zodResolver(UpdateStudentValidation),
    defaultValues: {
        first_name: post ? post?.first_name : "",
        last_name:  post ? post?.last_name  : "",
        email:  post ? post?.email  : "",
        phone:  post ? post?.phone  : "",
        birthday:  post ? post?.birthday  : "",
        address:  post ? post?.address :  "",
        
       
    },
  });

  // Handler
    // Handler


        const [showFields, setShowFields] = useState(false);
        const [dropdownVisible, setDropdownVisible] = useState(false);
    
        const handleUpdateClick = () => {
          setShowFields(!showFields);
        };
    
        const handleSwitchToggle = () => {
          setDropdownVisible(!dropdownVisible);
        };

  return (
    <div>
      <Card className="h-full w-full overflow-scroll bg-lightgray">
        <h2 className="h3-bold md:h2-bold text-left w-full">Students</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {["FirstName", "LastName", "Email", "Phone", "EmailField", ""].map((head, index) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-nowrap md:whitespace-normal"
                    onClick={() => handleColumnClick(staff[0])} // Assuming staff array is not empty
                    style={{ cursor: "pointer" }}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {staff.map((staffMember: IStaffUser, index: number) => {
                const isLast = index === staff.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes} onClick={() => handleColumnClick(staffMember)}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {staffMember.first_name}
                      </Typography>
                    </td>
                    <td className={classes} onClick={() => handleColumnClick(staffMember)}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {staffMember.last_name}
                      </Typography>
                    </td>
                    <td className={classes} onClick={() => handleColumnClick(staffMember)}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {staffMember.email}
                      </Typography>
                    </td>
                    <td className={classes} onClick={() => handleColumnClick(staffMember)}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {staffMember.phone}
                      </Typography>
                    </td>
                    <td className={classes} onClick={() => handleColumnClick(staffMember)}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {staffMember.emailfield}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={handleClickOutside}>
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-white opacity-75"></div>
            </div>
            <div
              ref={modalRef}
              className="relative z-50 bg-black rounded-lg w-1/2"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="flex justify-between p-4">
                <h3 className="text-lg font-medium" id="modal-headline">
                  Edit Student
                </h3>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                {selectedStaffMember && (
                  <div>
                    <p>FirstName {selectedStaffMember.first_name}</p>
                    <p>LastName {selectedStaffMember.last_name}</p>
                    <p>Email {selectedStaffMember.email}</p>
                    <p>Phone {selectedStaffMember.phone}</p>
                    <p>EmailField {selectedStaffMember.emailfield}</p>
                  </div>
                )}
              </div>
             
  {showFields && (
              <Form {...form}>
      <form
       
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





        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}>
            Cancel
          </Button>
         
        </div>
      </form>
    </Form>
      )}
             
            </div>
          </div>
        </div>  
      )}
    </div>
  );
}

export default HomeTable;

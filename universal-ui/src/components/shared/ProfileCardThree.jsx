import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import {
  Card,
  Input,
  Checkbox,
  Typography,
} from "@material-tailwind/react";
import { Button } from "../ui/button";

const ThirdForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (event) => {
    console.log("Form submitting"); // Add this line
    try{
    const response = await fetch("http://165.22.216.109/Account/reset-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.removeItem("accessToken", data.access);
      localStorage.removeItem("refreshToken", data.refresh);
      window.location.href = "/";
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    toast.error(error.message || "An error occurred. Please try again.");
  }
};
  // Update formValues state on input change
// Update formValues state on input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };


  return (
    <Card color="transparent" shadow={false}>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            name="email"
            value={formValues.email}
            onChange={handleChange} 
            size="lg"
            placeholder=""
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            New Password
          </Typography>
          <Input
            name="password"
            value={formValues.password}
            onChange={handleChange} 
            size="lg"
            placeholder=""
            type="password"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Confirm New Password
          </Typography>
          <Input
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            size="lg"
            type="password"
            placeholder=""
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Button type="submit">Submit</Button> 
      </form>
    </Card>
  );
};

export default ThirdForm;

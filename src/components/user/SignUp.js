import React, { useState } from "react";

import { BiSolidUserDetail } from "react-icons/bi";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { CustomInput } from "../customInput/CustomInput";

export const SignUp = () => {
  const [form, setForm] = useState({});
  const inputs = [
    {
      label: "First Name",
      name: "fName",
      required: true,
      placeholder: "sam",
      type: "text",
    },
    {
      label: "Last Name",
      name: "lName",
      required: true,
      placeholder: "sam",
      type: "text",
    },
    {
      label: "Phone Number",
      name: "phone",
      required: true,
      placeholder: "044899444",
      type: "number",
    },

    {
      label: "Address",
      name: "address",
      required: true,
      placeholder: "king street",
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      required: true,
      placeholder: "manandharkiran90@gmail.com",
      type: "email",
    },
    {
      label: "Password",
      name: "password",
      required: true,
      placeholder: "*******",
      type: "password",
      minLength: "6",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      required: true,
      placeholder: "********",
      type: "password",
      minLength: "6",
    },
  ];

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      return toast.error("Password should match");
    }
    // createNewAdminAction(rest);
  };
  console.log(form);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div>
      <Form
        className="m-auto p-5 border shadow-lg mt-5 rounded"
        style={{ width: "450px" }}
        onSubmit={handleOnSubmit}
      >
        <h3>
          <BiSolidUserDetail />
          Add New Admin
        </h3>
        <hr />
        {inputs.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}

        <div className="d-grid mt-5">
          <Button variant="dark" type="submit">
            Add New Admin
          </Button>
        </div>
      </Form>
    </div>
  );
};

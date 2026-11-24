"use client";

import { StudentSignupSchemaType } from "@/lib/types";
import { signUpFormSchema } from "@/lib/zodschema";
import studentsignup from "@/server/auth/studentsignup";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, LockIcon, UserIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../shadcnui/input-group";
import { Spinner } from "../shadcnui/spinner";
import { toast } from "../shadcnui/toast";

const SignupForm = () => {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    control,
    reset,
  } = useForm<StudentSignupSchemaType>({
    resolver: zodResolver(signUpFormSchema),

    defaultValues: {
      studentName: "",
      email: "",
      studentId: "",
      password: "",
    },

    mode: "onSubmit",
  });

  const studentSignupFormSubmit = async (slData: StudentSignupSchemaType) => {
    // await new Promise<void>((r) => setTimeout(r, 1800));

    const { isSuccess, message } = await studentsignup({
      studentName: slData.studentName,
      email: slData.email,
      password: slData.password,
      studentId: slData.studentId,
    });

    console.log(slData);
    if (isSuccess) {
      toast.add({
        type: "success",
        description: "Student Login Succesfully",
      });
      reset();
    } else {
      toast.add({
        type: "error",
        description: "Student Login faild",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(studentSignupFormSubmit)}
      className="grid grid-cols-1 gap-3"
      noValidate>
      <Controller
        name="studentName"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Studnet name</FieldLabel>

            <InputGroup>
              <InputGroupInput
                type="text"
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter Student name"
                autoComplete="off"
              />

              <InputGroupAddon align="inline-start">
                <UserIcon />
              </InputGroupAddon>
            </InputGroup>

            <div className="flex items-center gap-1">
              {fieldState.invalid && <FieldError /> && <InfoIcon size={16} />}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          </Field>
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Studnet email ID</FieldLabel>

            <InputGroup>
              <InputGroupInput
                type="text"
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter Studnet email ID"
                autoComplete="off"
              />

              <InputGroupAddon align="inline-start">
                <UserIcon />
              </InputGroupAddon>
            </InputGroup>

            <div className="flex items-center gap-1">
              {fieldState.invalid && <FieldError /> && <InfoIcon size={16} />}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          </Field>
        )}
      />

      <Controller
        name="studentId"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Studnet ID</FieldLabel>

            <InputGroup>
              <InputGroupInput
                type="text"
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter Your Studnet ID"
                autoComplete="off"
              />

              <InputGroupAddon align="inline-start">
                <UserIcon />
              </InputGroupAddon>
            </InputGroup>

            <div className="flex items-center gap-1">
              {fieldState.invalid && <FieldError /> && <InfoIcon size={16} />}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          </Field>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <InputGroup>
              <InputGroupInput
                type="password"
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter Your Password"
                autoComplete="off"
              />

              <InputGroupAddon align="inline-start">
                <LockIcon />
              </InputGroupAddon>
            </InputGroup>

            <div className="flex items-center gap-1">
              {fieldState.invalid && <FieldError /> && <InfoIcon size={16} />}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          </Field>
        )}
      />

      <Button
        type="submit"
        disabled={isSubmitting || !isValid}>
        {isSubmitting ?
          <Spinner />
        : "Login"}
      </Button>
    </form>
  );
};

export default SignupForm;

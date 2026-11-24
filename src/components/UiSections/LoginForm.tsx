"use client";

import { StudentLoginSchemaType } from "@/lib/types";
import { loginFormSchema } from "@/lib/zodschema";
import studentlogin from "@/server/auth/studentlogin";
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

const LoginForm = () => {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    control,
    reset,
  } = useForm<StudentLoginSchemaType>({
    resolver: zodResolver(loginFormSchema),

    defaultValues: {
      studentId: "",
      password: "",
    },

    mode: "onSubmit",
  });

  const studentLoginFormSubmit = async (slData: StudentLoginSchemaType) => {
    await new Promise<void>((r) => setTimeout(r, 1800));

    const { isSuccess, message } = await studentlogin({
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
      onSubmit={handleSubmit(studentLoginFormSubmit)}
      className="grid grid-cols-1 gap-3"
      noValidate>
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

export default LoginForm;

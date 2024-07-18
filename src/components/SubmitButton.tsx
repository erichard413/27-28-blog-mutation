"use client";
import React from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="btn btn-solid">
      {" "}
      {pending ? "Saving" : "Save"}
    </button>
  );
}

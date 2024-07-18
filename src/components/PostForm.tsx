"use client";

import { FormGroup } from "./FormGroup";
import { ReactNode, Suspense } from "react";
import Link from "next/link";
import { SkeletonInput } from "./Skeleton";
import { useFormState, useFormStatus } from "react-dom";
import { editPostAction, createNewPostAction } from "@/app/actions/post";

// errorMessage="Placeholder Error Message"

type Props = {
  userSelectOptions: ReactNode;
  post?: { id: number; title: string; body: string; userId: number } | null;
};

export function PostForm({ post, userSelectOptions }: Props) {
  const action =
    post == null ? createNewPostAction : editPostAction.bind(null, post.id);
  const [errors, formAction] = useFormState(action, {});
  return (
    <form action={formAction} className="form">
      <div className="form-row">
        <FormGroup errorMessage={errors.title}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={post?.title}
          />
        </FormGroup>
        <FormGroup errorMessage={errors.userId}>
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" defaultValue={post?.userId}>
            <Suspense fallback={<option value="">Loading...</option>}>
              {userSelectOptions}
            </Suspense>
          </select>
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup errorMessage={errors.body}>
          <label htmlFor="body">Body</label>
          <textarea name="body" id="body" defaultValue={post?.body} />
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link
          className="btn btn-outline"
          href={post ? `/posts/${post.id}` : "/posts"}
        >
          Cancel
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}

export function SkeletonPostForm() {
  return (
    <form className="form">
      <div className="form-row">
        <FormGroup>
          <label htmlFor="title">Title</label>
          <SkeletonInput />
        </FormGroup>
        <FormGroup>
          <label htmlFor="userId">Author</label>
          <SkeletonInput />
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup>
          <label htmlFor="body">Body</label>
          <SkeletonInput />
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link className="btn btn-outline" href="/posts">
          Cancel
        </Link>
        <button disabled className="btn">
          Save
        </button>
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn" disabled={pending}>
      {pending ? "Saving" : "Save"}
    </button>
  );
}

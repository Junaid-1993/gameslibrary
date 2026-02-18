"use client";

import Tags from "@/app/components/gamedetails/form/Tags";
import TextareaWithCounter from "@/app/components/gamedetails/form/TextareaWithCounter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Controller, FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { profileSchema } from "@/app/Schema/ProfileSchema";
import SelectInput from "@/app/components/SelectInput";
import { AnimatedErrorMessage } from "@/app/components/gamedetails/form/ReviewFormWithPreview";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import z from "zod";

// Later the user data will come from database:

// Infer the form values type from the profileSchema
type ProfileEditForm = z.input<typeof profileSchema>;

export default function page() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<ProfileEditForm>({
    resolver: zodResolver(profileSchema),
    shouldFocusError: false, // disables default focus behavior
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "Abigal",
      tagline: "",
      tags: [],
      visibility: "Public",
    },
  });

  const onSubmit: SubmitHandler<ProfileEditForm> = async (data) => {
    // If nothing changed, don't send the request
    if (!isDirty) {
      console.log("No changes detected. Skipping update.");
      return;
    }

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle the 400 error here
        console.error("Validation error:", result.error);
        return;
      }

      console.log("Success:", result.message);
      // Optional: reset() or redirect
    } catch (error) {
      console.error("Network or unexpected error:", error);
    }
  };

  // Create a custom error handler for the smooth scroll
  const onInvalid = (errors: FieldErrors<ProfileEditForm>) => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const firstError = errorKeys[0];
      const element =
        document.getElementsByName(firstError)[0] || document.getElementById(firstError);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus({ preventScroll: true });
      }
    }
  };

  return (
    <section className="mx-auto max-w-5xl">
      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="grid gap-6 md:gap-10">
        <div>
          <h2 className="font-space-grotesk text-[1.375rem] md:text-2xl 2xl:text-[1.625rem]">
            Edit Profile
          </h2>
        </div>
        <div className="mt-2 grid gap-6 md:mt-4 md:flex md:items-start md:gap-10 xl:gap-14">
          <div className="flex flex-col justify-center gap-4">
            <Image
              src="/avatars/user-profile-img.png"
              alt="User Profile Image"
              width={150}
              height={150}
              className="mx-auto rounded-full border-2 border-white md:h-36 md:w-36 lg:h-40 lg:w-40"
            />

            <Button variant="link" type="button" className="text-primary-300 cursor-pointer">
              Change Picture
            </Button>
          </div>
          <div className="grid justify-items-center gap-6 md:grow md:grid-cols-2 md:gap-4 md:gap-y-6">
            <div className="w-full max-w-sm">
              <div className="grid items-center gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                  className="border-border-400 focus-visible:ring-ring/35 h-12 text-sm lg:text-base"
                  placeholder="First Name"
                />
              </div>
              <AnimatedErrorMessage>{errors.firstName?.message}</AnimatedErrorMessage>
            </div>
            <div className="w-full max-w-sm">
              <div className="grid items-center gap-2">
                <Label htmlFor="lastName">Last tName</Label>
                <Input
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  className="border-border-400 focus-visible:ring-ring/35 h-12 text-sm lg:text-base"
                  placeholder="Last Name"
                />
              </div>
              <AnimatedErrorMessage>{errors.lastName?.message}</AnimatedErrorMessage>
            </div>
            <div className="w-full max-w-sm">
              <div className="grid items-center gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="userName"
                  {...register("userName")}
                  className="border-border-400 focus-visible:ring-ring/35 h-12 text-sm lg:text-base"
                  placeholder="username"
                />
              </div>
              <AnimatedErrorMessage>{errors.userName?.message}</AnimatedErrorMessage>
            </div>
          </div>
        </div>
        <div className="grid justify-items-center gap-6 md:grid-cols-2 md:items-start md:gap-4 lg:gap-6 xl:mt-4">
          <div className="w-full max-w-sm md:max-w-lg">
            <div className="grid items-center gap-2">
              <Controller
                name="tagline"
                control={control}
                render={({ field }) => (
                  <TextareaWithCounter
                    id="tagline" // Add this ID
                    content={field.value}
                    onChange={field.onChange}
                    allowedCharacters={200}
                    label="Tagline"
                    placeholder="What kind of gamer are you?"
                  />
                )}
              ></Controller>
            </div>
            <AnimatedErrorMessage>{errors.tagline?.message}</AnimatedErrorMessage>
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 md:max-w-lg">
            <Label htmlFor="tags">Add Tags (Optional)</Label>
            {/* <Tags /> */}
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Tags
                  // Limit them to 4
                  tags={[
                    "RPGs",
                    "Adventure",
                    "Action",
                    "Open-World",
                    "Story-Driven",
                    "Fantasy",
                    "Multiplayer",
                    "Single-Player",
                  ]}
                  selectedTags={field.value ?? []}
                  onSelect={(selectedTag) => {
                    const currentTags = field.value ?? [];
                    if (currentTags.includes(selectedTag)) {
                      field.onChange(currentTags.filter((tag) => tag !== selectedTag));
                    } else {
                      field.onChange([...currentTags, selectedTag]);
                    }
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className="justify-items-center md:justify-items-start">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="visibility">Profile Visibility</Label>
            <Controller
              name="visibility"
              control={control}
              render={({ field }) => (
                <SelectInput
                  id="profile-visibility"
                  options={["Public", "Private"]}
                  classes={{
                    contentClass: "py-2",
                    groupClass: "space-y-1",
                    itemClass:
                      "data-[state=checked]:bg-primary-900 [&_svg]:stroke-primary-400 py-2",
                  }}
                  values={field.value}
                  onSelect={(_, value) => field.onChange(value)}
                />
              )}
            />
          </div>
        </div>
        <div className="justify-items-center md:justify-items-start">
          <div className="w-full max-w-sm">
            <div className="flex items-center gap-2">
              <Button variant="glDefault" type="submit" disabled={!isDirty}>
                Save Changes
              </Button>
              <Button
                variant="outline"
                type="button"
                className="dark:border-border-400 cursor-pointer text-gray-300 hover:text-white dark:hover:bg-zinc-800"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
      <div className="mt-6 justify-items-center md:mt-10 md:justify-items-start">
        <div className="w-full max-w-sm md:max-w-full">
          <h3 className="font-space-grotesk text-danger-400 text-lg font-medium">Danger Zone</h3>

          <div className="border-danger-400 mt-4 grid gap-2 rounded-lg border p-4 xl:p-5">
            <h4 className="font-space-grotesk font-medium">Delete My Account</h4>
            <p className="text-sm">
              Permanently delete your GamesLibrary account and all associated data. This action{" "}
              <span className="text-accent-400">cannot be undone.</span>
            </p>

            <Button
              className="dark:bg-danger-700 dark:hover:bg-danger-800 mt-4 cursor-pointer text-white md:w-fit md:justify-self-end xl:mt-3"
              type="button"
            >
              <Trash2 />
              <span>Delete Account</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

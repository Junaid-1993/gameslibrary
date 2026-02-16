"use client";

import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { experienceSchema } from "@/app/Schema/ExperienceSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { PropsWithChildren, useEffect, useRef } from "react";
import { Controller, FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import z from "zod";
import SelectInput from "../../SelectInput";
import DetailedReview from "../DetailedReview";
import DetailedReviewToggleSwitch from "../DetailedReviewToggleSwitch";
import ReviewCard from "../ReviewCard";
import { AutoSizingInput } from "./AutoSizingInput";
import GamePoints from "./GamePoints";
import MultiSelectCheckbox from "./MultiSelectCheckbox";
import Tags from "./Tags";
import TextareaWithCounter from "./TextareaWithCounter";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: ["href", "title", "rel"],
  },
};

// Infer the form values type from the experienceSchema
type ExperienceForm = z.output<typeof experienceSchema>;

export default function ReviewFormWithPreview({
  id,
  activeTab,
}: {
  id: string;
  activeTab: "editor" | "preview";
}) {
  const isMobileUser = useMediaQuery("(max-width: 768px)");
  const hasMounted = useRef(false);

  const fieldRefs = {
    reviewTitle: useRef<HTMLInputElement>(null),
    reviewSummary: useRef<HTMLTextAreaElement>(null),
    platformsPlayed: useRef<HTMLButtonElement>(null),
    totalHours: useRef<HTMLInputElement>(null),
    completionStatus: useRef<HTMLButtonElement>(null),
    detailedReview: useRef<HTMLTextAreaElement | null>(null),
    goodPoint: useRef<HTMLInputElement>(null),
    badPoint: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fieldRefs.detailedReview.current = document.getElementById(
        "detailed-review"
      ) as HTMLTextAreaElement | null;
    }, 1000); // defer to next tick

    return () => clearTimeout(timeout);
  }, [fieldRefs.detailedReview]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    resetField,
    trigger,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<ExperienceForm>({
    resolver: zodResolver(experienceSchema),
    shouldFocusError: false, // disables default focus behavior
    defaultValues: {
      reviewSummary: "", // optional but recommended for all fields
      platformsPlayed: [],
      detailedReviewEnabled: false, // toggle starts off
      totalHours: "",
      completionStatus: "",
      detailedReview: "",
      goodPoint: [],
      badPoint: [],
      tags: [],
    },
  });

  // Short review fields
  const reviewTitle = watch("reviewTitle");
  const reviewSummary = watch("reviewSummary");

  // Detailed review fields
  const isDetailedReview = watch("detailedReviewEnabled");
  const selectedPlatforms = watch("platformsPlayed") || [];
  const totalHours = watch("totalHours");
  const completionStatus = watch("completionStatus");
  const detailedReview = watch("detailedReview");
  const goodPoints = watch("goodPoint") || [];
  const badPoints = watch("badPoint") || [];
  const selectedTags = watch("tags") || [];

  const hasShortReview = reviewTitle?.trim().length >= 1 && reviewSummary?.trim().length >= 1;

  const hasDetailedReview =
    isDetailedReview &&
    selectedPlatforms.length > 0 &&
    totalHours &&
    Number(totalHours) > 0 &&
    Number(totalHours) < 1000 &&
    completionStatus &&
    completionStatus?.trim().length > 0 &&
    detailedReview &&
    detailedReview?.trim().length >= 50 &&
    goodPoints.length > 0 &&
    badPoints.length > 0;

  const hasShortReviewRequiredErrors = [errors.reviewTitle, errors.reviewSummary].some(Boolean);
  const hasDetailedReviewRequiredErrors = [
    errors.platformsPlayed,
    errors.totalHours,
    errors.completionStatus,
    errors.detailedReview,
    errors.goodPoint,
    errors.badPoint,
  ].some(Boolean);

  // Reset these fields if toggle turns off
  useEffect(() => {
    if (!isDetailedReview) {
      resetField("platformsPlayed");
      resetField("totalHours");
      resetField("completionStatus");
      resetField("detailedReview");
      resetField("goodPoint");
      resetField("badPoint");
      resetField("tags");
    }
  }, [isDetailedReview, resetField]);

  const hasAllRequiredErrors = [
    errors.reviewTitle,
    errors.reviewSummary,
    errors.platformsPlayed,
    errors.totalHours,
    errors.completionStatus,
    errors.detailedReview,
    errors.goodPoint,
    errors.badPoint,
  ].some(Boolean);

  const onSubmit: SubmitHandler<ExperienceForm> = async (data) => {
    try {
      const response = await fetch("/api/experience", {
        // Adjust path if dynamic
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle Zod errors returned from server
        console.error("Server Validation Errors:", result.errors);
        return;
      }

      alert("Experience submitted successfully!");
      // Optional: reset() or redirect
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
    }
  };

  // If errors focus on the first required field dynamically
  const onError = (errors: FieldErrors<ExperienceForm>) => {
    setTimeout(() => {
      const firstErrorKey = Object.keys(errors)[0];

      const ref = fieldRefs[firstErrorKey as keyof typeof fieldRefs];
      if (ref?.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
        // Delay focus slightly to allow smooth scroll to complete
        setTimeout(() => {
          ref.current?.focus?.(); // optional for non-inputs
        }, 300); // 300ms matches scroll duration
      }
    }, 0);
  };

  return (
    <AnimatePresence mode="wait">
      {activeTab === "editor" && (
        <motion.section
          key="editor"
          initial={hasMounted.current ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {hasAllRequiredErrors && (
              <motion.div
                key="error-banner"
                tabIndex={-1}
                initial={{ opacity: 0, maxHeight: 0 }}
                animate={{ opacity: 1, maxHeight: 50 }}
                exit={{ opacity: 0, maxHeight: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence propagate>
                  <motion.div
                    key="error-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0"
                    >
                      <g clipPath="url(#clip0_467_6197)">
                        <path
                          d="M25.9012 20.5724L16.3363 3.96163C16.0973 3.55468 15.7561 3.21725 15.3465 2.98279C14.9369 2.74834 14.4731 2.625 14.0012 2.625C13.5292 2.625 13.0655 2.74834 12.6559 2.98279C12.2463 3.21725 11.905 3.55468 11.666 3.96163L2.10117 20.5724C1.8712 20.966 1.75 21.4137 1.75 21.8696C1.75 22.3255 1.8712 22.7732 2.10117 23.1668C2.33713 23.5762 2.67777 23.9155 3.08813 24.1498C3.4985 24.3841 3.96381 24.505 4.43633 24.5001H23.566C24.0382 24.5046 24.503 24.3835 24.913 24.1492C25.3229 23.9149 25.6632 23.5759 25.899 23.1668C26.1293 22.7734 26.2509 22.3258 26.2513 21.8699C26.2516 21.414 26.1308 20.9662 25.9012 20.5724ZM13.1262 11.3751C13.1262 11.143 13.2184 10.9204 13.3825 10.7564C13.5465 10.5923 13.7691 10.5001 14.0012 10.5001C14.2332 10.5001 14.4558 10.5923 14.6199 10.7564C14.784 10.9204 14.8762 11.143 14.8762 11.3751V15.7501C14.8762 15.9821 14.784 16.2047 14.6199 16.3688C14.4558 16.5329 14.2332 16.6251 14.0012 16.6251C13.7691 16.6251 13.5465 16.5329 13.3825 16.3688C13.2184 16.2047 13.1262 15.9821 13.1262 15.7501V11.3751ZM14.0012 21.0001C13.7416 21.0001 13.4878 20.9231 13.272 20.7789C13.0561 20.6347 12.8879 20.4297 12.7886 20.1898C12.6892 19.95 12.6632 19.6861 12.7139 19.4315C12.7645 19.1769 12.8895 18.9431 13.0731 18.7595C13.2567 18.5759 13.4905 18.4509 13.7451 18.4003C13.9997 18.3496 14.2636 18.3756 14.5034 18.475C14.7433 18.5743 14.9483 18.7425 15.0925 18.9584C15.2367 19.1742 15.3137 19.428 15.3137 19.6876C15.3137 20.0357 15.1754 20.3695 14.9293 20.6156C14.6831 20.8618 14.3493 21.0001 14.0012 21.0001Z"
                          fill="#FCA311"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_467_6197">
                          <rect width="28" height="28" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <p className="text-warning-400 text-sm md:text-base">
                      Please fill out all required fields before submitting your experience.
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <form className="mt-4 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit, onError)}>
            <h4 className="font-space-grotesk text-lg font-medium">Short Review:</h4>
            <div>
              <div className="flex flex-col gap-3 md:w-[470px] lg:w-1/2 2xl:w-2/5">
                <Label htmlFor="reviewTitle">Review Title</Label>
                <Input
                  type="text"
                  id="reviewTitle"
                  {...register("reviewTitle")}
                  ref={(el) => {
                    fieldRefs.reviewTitle.current = el; // assign to your ref
                    register("reviewTitle").ref(el); // assign to RHF's internal ref
                  }}
                  className="border-border-400 focus-visible:ring-ring/35 h-12 text-sm lg:text-base"
                  placeholder="Give your review a headline (eg. A memorable journey)"
                />
              </div>
              <AnimatedErrorMessage>{errors.reviewTitle?.message}</AnimatedErrorMessage>
            </div>
            <div className="md:w-[470px] lg:w-1/2 2xl:w-2/5">
              <Controller
                name="reviewSummary"
                control={control}
                render={({ field }) => (
                  <TextareaWithCounter
                    content={field.value}
                    onChange={field.onChange}
                    ref={fieldRefs.reviewSummary}
                  />
                )}
              ></Controller>
              <AnimatedErrorMessage>{errors.reviewSummary?.message}</AnimatedErrorMessage>
            </div>

            <div className="flex items-center gap-6">
              <p className="font-medium">Add detailed review</p>
              <div>
                <Controller
                  name="detailedReviewEnabled"
                  control={control}
                  render={({ field }) => (
                    <DetailedReviewToggleSwitch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            <motion.div
              initial={false}
              animate={{
                height: isDetailedReview ? "auto" : 0,
                opacity: isDetailedReview ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-6">
                <h4 className="font-space-grotesk text-lg font-medium">Detailed Review:</h4>
                <div className="flex flex-col gap-10">
                  <div className="grid gap-3">
                    <FieldSet title=" Gameplay Details:">
                      <div className="flex flex-col items-start gap-3 md:flex-row">
                        <div className="ml:grow-0 w-full md:w-auto md:grow">
                          <motion.div layout className="mb-2">
                            <Controller
                              name="platformsPlayed"
                              control={control}
                              render={({ field }) => (
                                <MultiSelectCheckbox
                                  options={["PC", "Xbox One", "PlayStation 4", "Nintendo Switch"]}
                                  selected={field.value ?? []}
                                  onChange={field.onChange}
                                  placeholder="Platform(s) Played On"
                                  errorHighlight={!!errors.platformsPlayed}
                                  ref={fieldRefs.platformsPlayed}
                                />
                              )}
                            ></Controller>
                          </motion.div>

                          <ul className="text-primary-200 list-disc pl-5">
                            <AnimatePresence initial={false} mode="wait">
                              {selectedPlatforms.length > 0 && (
                                <AnimatePresence propagate initial={false}>
                                  {selectedPlatforms.map((selected) => (
                                    <motion.li
                                      key={selected}
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{
                                        opacity: 0,
                                        height: 0,
                                        transition: { duration: 0.2 },
                                      }}
                                      transition={{ duration: 0.2, ease: "easeInOut" }}
                                    >
                                      <motion.div
                                        className="px-1"
                                        initial={{ opacity: 0, marginTop: 0 }}
                                        animate={{ opacity: 1, marginTop: 4 }}
                                        exit={{
                                          opacity: 0,
                                          marginTop: 0,
                                          transition: { duration: 0.15 },
                                        }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                      ></motion.div>
                                      {selected}
                                    </motion.li>
                                  ))}
                                </AnimatePresence>
                              )}
                            </AnimatePresence>
                          </ul>
                        </div>
                        <div className="w-full md:w-auto">
                          <motion.div layout className="mb-2">
                            <div
                              className={`dark:bg-input/30 dark:border-border-400 flex h-12 w-full items-center justify-between gap-6 rounded-md border p-3 md:w-[245px] ${errors.totalHours ? "dark:border-danger-300" : ""} `}
                            >
                              <Label
                                htmlFor="total-hours"
                                className="text-muted-foreground text-[0.938rem]"
                              >
                                Total Hours Played
                              </Label>

                              <Controller
                                name="totalHours"
                                control={control}
                                render={({ field }) => (
                                  <AutoSizingInput
                                    id="total-hours"
                                    className="border-border-400 dark:bg-background focus-visible:ring-ring/35 h-9 text-sm lg:text-base"
                                    value={field.value ?? ""}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      field.onChange(val);
                                    }}
                                    placeholder="000"
                                    ref={(el) => {
                                      fieldRefs.totalHours.current = el; // assign to your ref
                                      register("totalHours").ref(el); // assign to RHF's internal ref
                                    }}
                                  />
                                )}
                              ></Controller>
                            </div>
                          </motion.div>

                          <AnimatePresence mode="wait" initial={false}>
                            {totalHours && (
                              <motion.div
                                key="total-time"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="text-primary-200"
                              >
                                <AnimatePresence propagate>
                                  <motion.p
                                    className="px-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{
                                      opacity: 0,
                                      transition: { duration: 0.15 },
                                    }}
                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                  >
                                    {`${totalHours} ${Number(totalHours) > 1 ? "Hours" : "Hour"}`}
                                  </motion.p>
                                </AnimatePresence>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="ml:grow-0 w-full md:w-auto md:grow">
                          <motion.div layout className="mb-2">
                            <div>
                              <Controller
                                name="completionStatus"
                                control={control}
                                render={({ field }) => (
                                  <SelectInput
                                    id="completion-status"
                                    placeholder="How far did you get?"
                                    options={[
                                      "Finished Main Story",
                                      "Played Partially",
                                      "100% Completed",
                                    ]}
                                    className={`ml:w-[250px] data-[size=default]:h-12 md:w-full ${errors.completionStatus ? "border-danger-300" : ""}`}
                                    classes={{
                                      contentClass: "py-2",
                                      groupClass: "space-y-1",
                                      itemClass:
                                        "data-[state=checked]:bg-primary-900 [&_svg]:stroke-primary-400 py-2",
                                    }}
                                    values={field.value}
                                    onSelect={(_, value) => field.onChange(value)}
                                    reviewForm
                                    ref={fieldRefs.completionStatus}
                                  />
                                )}
                              />
                            </div>
                          </motion.div>

                          <AnimatePresence mode="wait" initial={false}>
                            {completionStatus && (
                              <motion.div
                                key="completion-status"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                              >
                                <AnimatePresence propagate>
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{
                                      opacity: 0,
                                      transition: { duration: 0.15 },
                                    }}
                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                    className="text-primary-200 px-1"
                                  >
                                    <div className="flex items-center gap-1">
                                      {completionStatus}
                                      <Button
                                        type="button"
                                        title="Delete Status"
                                        aria-label="Delete Status"
                                        variant="ghost"
                                        className="mt-0.5 h-auto cursor-pointer p-0 text-white hover:text-red-400 dark:hover:bg-transparent"
                                        onClick={() => {
                                          resetField("completionStatus");
                                          if (isSubmitted) {
                                            trigger("completionStatus"); // only validate if form was submitted
                                          }
                                        }}
                                      >
                                        <X className="size-4.5" />
                                      </Button>
                                    </div>
                                  </motion.div>
                                </AnimatePresence>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      {(errors.platformsPlayed || errors.totalHours || errors.completionStatus) && (
                        <AnimatedErrorMessage>
                          Please select all required fields before submitting your experience.
                        </AnimatedErrorMessage>
                      )}
                    </FieldSet>
                  </div>
                  <div>
                    <motion.div layout className="grid gap-3">
                      <FieldSet title="Share a detailed review">
                        <div className="prose dark:prose-invert max-w-none">
                          <Controller
                            name="detailedReview"
                            control={control}
                            render={({ field }) => (
                              <MDEditor
                                value={field.value}
                                onChange={(val) => field.onChange(val || "")}
                                height={isMobileUser ? 500 : 450}
                                preview={isMobileUser ? "edit" : "live"}
                                textareaProps={{
                                  id: "detailed-review",
                                  "aria-label": "Detailed review of your experience",
                                  placeholder:
                                    "Share your full experience, opinions, highlights, and any constructive feedback.",
                                }}
                                previewOptions={{
                                  rehypePlugins: [[rehypeSanitize, schema]],
                                }}
                              />
                            )}
                          />
                        </div>
                      </FieldSet>
                    </motion.div>
                    <AnimatedErrorMessage>{errors.detailedReview?.message}</AnimatedErrorMessage>
                  </div>

                  <div className="grid gap-3">
                    <FieldSet title="Share the good and bad points about the game">
                      <div
                        className="ml:flex-row flex flex-col items-start gap-8"
                        aria-labelledby="game-points"
                      >
                        <div className="w-full lg:w-1/2">
                          <Controller
                            name="goodPoint"
                            control={control}
                            render={({ field }) => (
                              <GamePoints
                                ref={fieldRefs.goodPoint}
                                pointTitle="Good"
                                points={field.value ?? []}
                                onAddPoint={(newPoint) =>
                                  field.onChange([...(field.value ?? []), newPoint])
                                }
                                onDeletePoint={(id) =>
                                  field.onChange(
                                    (field.value ?? []).filter((point) => point.id !== id)
                                  )
                                }
                              />
                            )}
                          />

                          <AnimatedErrorMessage>{errors.goodPoint?.message}</AnimatedErrorMessage>
                        </div>

                        <div className="w-full lg:w-1/2">
                          <Controller
                            name="badPoint"
                            control={control}
                            render={({ field }) => (
                              <GamePoints
                                ref={fieldRefs.badPoint}
                                pointTitle="Bad"
                                points={field.value ?? []}
                                onAddPoint={(newPoint) =>
                                  field.onChange([...(field.value ?? []), newPoint])
                                }
                                onDeletePoint={(id) =>
                                  field.onChange(
                                    (field.value ?? []).filter((point) => point.id !== id)
                                  )
                                }
                              />
                            )}
                          />

                          <AnimatedErrorMessage>{errors.badPoint?.message}</AnimatedErrorMessage>
                        </div>
                      </div>
                    </FieldSet>
                  </div>

                  <motion.div layout className="grid gap-3">
                    <FieldSet title="Add Tags (optional)">
                      <div className="flex items-start gap-8" aria-labelledby="tags">
                        <Controller
                          name="tags"
                          control={control}
                          render={({ field }) => (
                            <Tags
                              tags={["immersive", "grindy", "emotional", "buggy"]}
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
                    </FieldSet>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div layout className="mt-4 flex items-center gap-4 md:mt-2 md:gap-6">
              <p className="text-lg font-semibold">Your Rating:</p>
              <p className="text-accent-400 font-medium">Not Yet Rated</p>
            </motion.div>

            <motion.div layout className="flex items-center gap-2 md:gap-3">
              <Button
                variant="outline"
                className="dark:border-border-400 cursor-pointer text-gray-300 hover:text-white dark:hover:bg-zinc-800"
              >
                Save as Draft
              </Button>
              <Button variant="glDefault" type="submit" disabled={isSubmitting}>
                Share Review
              </Button>
            </motion.div>
          </form>
        </motion.section>
      )}

      {activeTab === "preview" && (
        <motion.section
          key="preview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <div className="flex flex-col gap-6">
            <h4 className="font-space-grotesk text-lg font-medium">Short Review:</h4>

            {/* Short Review Preview */}
            {hasShortReview && (
              <ReviewCard
                id={id}
                className="lg:w-[726px]"
                review={{
                  id: 5124682,
                  author: "Alex Martinez",
                  avatarUrl: "/avatars/avatar.png",
                  reviewTitle,
                  content: reviewSummary,
                  dateAdded: "April 15, 2024",
                  hasDetailedReview: !!hasDetailedReview,
                }}
              />
            )}

            {!hasShortReview && hasShortReviewRequiredErrors ? (
              <span className="text-center text-sm">
                Short Review Incomplete — fill all required fields to preview.
              </span>
            ) : !hasShortReview ? (
              <span className="text-center text-sm">No Short Review Written Yet.</span>
            ) : null}

            <h4 className="font-space-grotesk text-lg font-medium">Detailed Review:</h4>
            {/* Detailed Review Preview */}
            {hasDetailedReview && (
              <DetailedReview
                id={id}
                review={{
                  playedPlatforms: selectedPlatforms,
                  hoursPlayed: totalHours,
                  completionStatus: completionStatus,
                  detailedReview: detailedReview,
                  goodPoints: goodPoints,
                  badPoints: badPoints,
                  selectedTags: selectedTags,
                  rating: 7,
                }}
              />
            )}

            {!hasDetailedReview && hasDetailedReviewRequiredErrors ? (
              <span className="text-center text-sm">
                Detailed Review Incomplete — fill all required fields to preview.
              </span>
            ) : !hasDetailedReview ? (
              <span className="text-center text-sm">No Detailed Review Written Yet.</span>
            ) : null}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

function FieldSet({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

export function AnimatedErrorMessage({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {children && (
        <motion.p
          key="error"
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 10 }}
          exit={{
            opacity: 0,
            height: 0,
            marginTop: 0,
            transition: { duration: 0.2 },
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn("text-danger-300 mt-2.5 overflow-hidden text-sm", className)}
        >
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

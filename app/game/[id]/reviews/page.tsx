import BrowseReviewsFilters from "@/app/components/gamedetails/BrowseReviewsFilters";
import ReviewCards from "@/app/components/gamedetails/ReviewCards";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-4 xl:flex-row">
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-3.5 pt-[0.413rem] md:gap-5">
            <h3 className="font-space-grotesk text-xl font-medium xl:text-[22px]">
              Player Reviews
            </h3>
            <p className="text-secondary text-sm lg:text-base">3 reviews</p>
          </div>
          <div className="flex items-center gap-5">
            <p className="lg:text-lg">Average community rating</p>
            <p className="text-accent-500 border-border-400 rounded-lg border p-2 text-lg font-semibold lg:text-[1.375rem]">
              8,6
            </p>
            <p className="text-secondary text-sm lg:text-base">Based on 3 reviews</p>
          </div>
        </div>
        <div>
          <div className="mt-4 w-full md:mt-1 md:w-auto lg:mt-0">
            <BrowseReviewsFilters />
          </div>
        </div>
      </div>

      <div>
        <ReviewCards id={id} />
      </div>
    </section>
  );
}

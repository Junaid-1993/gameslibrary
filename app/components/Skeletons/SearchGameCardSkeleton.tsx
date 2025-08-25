import { Skeleton } from "@/components/ui/skeleton";

export default function SearchGameCardSkeleton() {
  return (
    <div className="dark:bg-background mm:h-[266px] flex flex-col gap-6 rounded-md p-4 xl:h-[202px] xl:flex-row xl:gap-4 2xl:gap-7">
      <div className="flex grow-1 gap-5 2xl:gap-8">
        <div className="mm:flex hidden flex-shrink-0">
          <Skeleton className="h-[165px] w-[110px]" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-[28px] w-[147px]" />
          <Skeleton className="h-[20px] w-[147px]" />

          <div className="mm:flex mt-4 hidden gap-1">
            <Skeleton className="h-[18px] w-[147px]" />
          </div>
          <div className="mm:flex mt-4 hidden items-center gap-2">
            <Skeleton className="h-[34px] w-[147px]" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 xl:flex-col-reverse xl:items-end">
        <Skeleton className="h-[40px] w-full xl:w-[132px]" />
        <Skeleton className="mm:flex hidden h-[40px] w-[108px] flex-shrink-0" />
      </div>
    </div>
  );
}

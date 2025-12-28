import Image from "next/image";

interface StatCardProps {
  statIconUrl: string;
  statIconAlt: string;
  totalStatNumber: number;
  statTitle: string;
}

export default function StatCard({
  statIconAlt,
  statIconUrl,
  statTitle,
  totalStatNumber,
}: StatCardProps) {
  return (
    <div className="border-border-400 grid gap-2 rounded-lg border px-2 py-4 text-center md:py-6">
      <div>
        <Image
          src={statIconUrl}
          alt={`${statIconAlt} Icon`}
          width={32}
          height={32}
          className="mx-auto xl:size-9 2xl:size-10"
        />
      </div>
      <div>
        <div>
          <h4 className="font-space-grotesk text-xl font-medium 2xl:text-[1.375rem]">
            {totalStatNumber}
          </h4>
        </div>
        <div className="2xl:mt-1">
          <p className="text-secondary text-sm 2xl:text-base">{statTitle}</p>
        </div>
      </div>
    </div>
  );
}

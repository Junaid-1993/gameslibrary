import clsx from "clsx";

interface FeatureExplainProps {
  title: string;
  description: string;
  index: number;
}

export default function FeatureExplain({ title, description, index }: FeatureExplainProps) {
  const isEven = (index + 1) % 2 === 0;

  return (
    <article
      className={clsx(
        "dark:bg-surface-500 border-border-400 relative z-10 items-center gap-10 overflow-hidden rounded-[12px] border px-4 py-6 md:flex md:px-7 md:py-8 xl:px-10 xl:py-9 2xl:gap-15 2xl:px-12",
        // ::Before
        "before:bg-primary-600 before:absolute before:-left-20 before:z-[-1] before:block before:h-40 before:w-40 before:blur-[80px] md:before:blur-[100px] xl:before:-left-24 xl:before:h-45 xl:before:w-45",
        isEven ? "before:-top-20 xl:before:-top-24" : "before:-bottom-20 xl:before:-bottom-24",
        // After
        "after:bg-primary-600 after:absolute after:-right-20 after:z-[-1] after:block after:h-40 after:w-40 after:blur-[80px] md:after:blur-[100px] xl:after:-right-24 xl:after:h-45 xl:after:w-45",
        isEven ? "after:-bottom-20 xl:after:-bottom-24" : "after:-top-20 xl:after:-top-24"
      )}
    >
      <div className={`md:w-1/2 ${isEven ? "order-2" : "order-1"} `}>
        <h3 className="font-space-grotesk text-xl xl:text-[1.375rem]">{title}</h3>
        <p className="mt-3 text-[0.938rem] lg:mr-10 xl:mr-20 xl:text-base 2xl:mr-25">
          {description}
        </p>
      </div>
      <div
        className={`dark:bg-surface-500 mx-auto mt-8 flex h-52 w-full max-w-96 items-center justify-center rounded-md border border-amber-500 md:mt-0 md:w-1/2 lg:h-56 xl:h-65 xl:max-w-[450px] 2xl:h-72 2xl:max-w-[550px] ${isEven ? "order-1" : "order-2"}`}
      >
        <p className="text-center text-sm">
          Screenshot or a Gif explaining this feature of the app.
        </p>
      </div>
    </article>
  );
}

import Image from "next/image";

type FeatureProps = {
  icon: { src: string; alt: string };
  title: string;
  description: string;
};

export default function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="flex flex-col items-center gap-6 md:w-[340px] 2xl:w-[320px] 2xl:gap-7">
      <div>
        <Image
          src={icon.src}
          alt={icon.alt}
          width={85}
          height={85}
          className="md:h-[80px] md:w-[80px] 2xl:h-[90px] 2xl:w-[90px]"
        />
      </div>
      <div className="text-center">
        <h3 className="font-space-grotesk text-xl 2xl:text-[1.375rem]">{title}</h3>
        <p className="text-secondary mt-2">{description}</p>
      </div>
    </div>
  );
}

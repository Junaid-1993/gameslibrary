import { Chakra_Petch } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const chakraPetch = Chakra_Petch({
  // variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Brand() {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <Link href="/">
        <Image
          src="/brand-logo.svg"
          alt="Games Library Logo"
          priority={true}
          width={32}
          height={32}
          className="sm:w-[40px] 2xl:w-[50px]"
        />
      </Link>
      <span
        className={`${chakraPetch.className} text-primary-400 text-xl font-medium 2xl:text-[22px]`}
      >
        GamesLibrary
      </span>
    </div>
  );
}

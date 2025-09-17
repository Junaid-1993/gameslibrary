import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function MarqueeCovers() {
  const covers = [
    { src: "/covers/assassin-creed-shadows.jpg", alt: "Assassin creed shadows game cover" },
    { src: "/covers/atomfall.jpg", alt: "Atomfall game cover" },
    { src: "/covers/call-of-duty-mw-3.jpg", alt: "Call of duty game cover" },
    { src: "/covers/gta-5.jpg", alt: "GTA 5 game cover" },
    { src: "/covers/metal-gear-solid-3.jpg", alt: "Metal gear solid 3 game cover" },
    { src: "/covers/need-for-speed-the-run.jpg", alt: "Need for speed the run game cover" },
    { src: "/covers/red-dead-redemption-2.jpg", alt: "Red dead redemption 2 game cover" },
    { src: "/covers/south-of-midnight.jpg", alt: "South of midnight game cover" },
    { src: "/covers/split-fiction.jpg", alt: "Split fiction game cover" },
    { src: "/covers/uncharted-2.jpg", alt: "Uncharted 2 game cover" },
  ];

  return (
    <div className="relative w-full overflow-hidden py-6">
      <Marquee speed={20} gradient={false}>
        {covers.map((cover, i) => (
          <div key={i} className="mx-1.5 will-change-transform xl:mr-2">
            <Image
              src={cover.src}
              alt={cover.alt}
              width={100}
              height={120}
              className="h-[150px] w-[110px] rounded-sm object-cover 2xl:h-[215] 2xl:w-[150]"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

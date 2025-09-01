import Link from "next/link";
import Brand from "../Brand";
import Image from "next/image";

export default function Footer() {
  const footerLinks = [
    [
      { label: "Home", href: "/" },
      { label: "Browse Games", href: "/browsegames" },
      { label: "My Library", href: "/mylibrary" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Favorites", href: "/favorites" },
    ],
    [
      { label: "Game Discovery", href: "/#game-discovery" },
      { label: "Custom Lists", href: "/#custom-lists" },
      { label: "Review Sharing", href: "/#review-sharing" },
      { label: "Library Search", href: "/#library-search" },
      { label: "Personalized Tags", href: "/#personalized-tags" },
      { label: "Game Rating & Goals", href: "/#game-rating-goals" },
      { label: "Profile & Stats", href: "/#profile-stats" },
    ],
    [
      { label: "About Me", href: "/#" },
      { label: "My Projects", href: "/#" },
      { label: "My Portfolio Website", href: "/#" },
    ],
  ];
  return (
    <footer className="border-border-400 dark:bg-surface-500 text-muted-foreground mt-15 border-t 2xl:mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-8 md:mt-3 lg:px-8 lg:py-8 xl:py-10">
        <div className="grid gap-9 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-6 lg:gap-12 2xl:grid-cols-[3fr_1fr_1fr_1fr]">
          {/* Brand & Description */}
          <div className="md: flex flex-col gap-4 xl:max-w-[390px]">
            <Brand isFooter />
            <p className="text-sm leading-6">
              Discover, organize, and share your ultimate gaming journey. GamesLibrary is your
              personalized hub to track, review, and explore the world of video games.
            </p>
            <div className="flex gap-4">
              <Link href="/signup" className="text-primary-500 font-medium hover:underline">
                Sign Up
              </Link>
              <Link href="/demo" className="text-primary-500 font-medium hover:underline">
                Try Demo
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-foreground font-semibold">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLinks[0].map((link) => (
                <li key={link.label} className="transition hover:text-white">
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-foreground font-semibold">Features</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLinks[1].map((link) => (
                <li key={link.label} className="transition hover:text-white">
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-foreground font-semibold">Developer</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLinks[2].map((link) => (
                <li key={link.label} className="transition hover:text-white">
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-4">
              <Link href="https://github.com/Junaid-1993" target="_blank" rel="noopener noreferrer">
                <Image src="/github-mark-white.png" alt="GitHub Icon" width={32} height={32} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-border text-muted-foreground mt-8 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs md:flex-row md:text-sm">
          <p>© 2025 GamesLibrary. All rights reserved.</p>
          <p>
            Built with <span className="text-red-500">❤</span> by Junaid Ali
          </p>
        </div>
      </div>
    </footer>
  );
}

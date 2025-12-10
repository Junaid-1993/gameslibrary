import MyLibraryNavLinks from "../components/mylibrary/MyLibraryNavLinks";

export default function MyLibraryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto mt-4 flex w-full max-w-[1540px] flex-col gap-6 px-6 pb-0 md:mt-9 md:pb-6 lg:px-8 2xl:mt-10">
      <section className="flex flex-col gap-6 2xl:gap-8">
        <div>
          <h2 className="font-space-grotesk mb-2 text-[1.375rem] md:text-2xl 2xl:text-[1.625rem]">
            My Library
          </h2>
          <p>
            Easily manage your game collection — add titles to custom lists, sort and search through
            your library, and view your games in layouts that suit your style.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-baseline gap-3.5 pt-[0.413rem] md:gap-5">
            <h3 className="font-space-grotesk text-lg xl:text-xl">Pinned Lists</h3>
            <p className="text-secondary text-sm lg:text-base">0 Lists</p>
          </div>

          <div className="grid gap-2 text-center">
            <h4 className="font-space-grotesk xl:text-lg">
              You haven&apos;t pinned any lists yet.
            </h4>
            <p className="text-secondary">
              Pin your most important lists to access them here easily.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <MyLibraryNavLinks userLibraryData={{ lists: 1, wishlist: 0, favorites: 0 }} />
        </div>
      </section>
      {children}
    </div>
  );
}

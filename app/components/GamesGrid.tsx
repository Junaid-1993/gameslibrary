export default function GamesGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 sm:gap-x-3 lg:grid-cols-4 xl:gap-x-4 xl:gap-y-5 2xl:grid-cols-5 2xl:gap-x-3">
      {children}
    </div>
  );
}

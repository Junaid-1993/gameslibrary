import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto mt-4 flex w-full max-w-[1540px] flex-col gap-6 px-6 pb-0 md:mt-9 md:pb-6 lg:px-8 2xl:mt-10">
      {children}
    </div>
  );
}

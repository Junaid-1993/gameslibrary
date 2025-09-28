import * as motion from "motion/react-client";
import Image from "next/image";

export default function NotFoundGames() {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="mt-6 flex items-center justify-center xl:mt-2.5"
    >
      <div className="flex flex-col items-center">
        <Image
          src="/not-found-illustration.svg"
          alt="Not found Illustration"
          width={245}
          height={180}
          className="h-auto w-32 md:w-36 xl:w-56"
        />
        <h2 className="font-space-grotesk mt-4 text-xl xl:mt-6 xl:text-2xl">No Games Found</h2>
        <p className="text-muted-foreground mt-1 xl:mt-2">
          Try adjusting your filters or search terms.
        </p>
      </div>
    </motion.div>
  );
}

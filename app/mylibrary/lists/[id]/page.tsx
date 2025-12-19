import LinkWithArrow from "@/app/components/LinkWithArrow";
import FullListView from "@/app/components/mylibrary/FullListView";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <section className="grid gap-6">
      <div className="text-center">
        <LinkWithArrow
          href="/mylibrary/lists"
          title="Back to All Lists"
          arrowDirection="left"
          className="text-primary-300 hover:text-primary-500 border-none !pl-0 sm:!pl-3"
        />
      </div>
      <div>
        <FullListView id={id} />
      </div>
    </section>
  );
}

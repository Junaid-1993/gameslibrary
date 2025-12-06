import ContentNotFound from "@/app/components/ContentNotFound";
import CreateButton from "@/app/components/CreateButton";
import CollapseButton from "@/app/components/mylibrary/CollapseButton";
import List from "@/app/components/mylibrary/List";
import ListsFilter from "@/app/components/mylibrary/ListsFilter";
import ViewSwitchButtons from "@/app/components/mylibrary/ViewSwitchButtons";
import SearchInput from "@/app/components/SearchInput";
import * as motion from "motion/react-client";

export default function Page() {
  const lists = [
    {
      id: 0,
      title: "My First List",
      createdDate: "May 10, 2025",
      url: "/lists/my-first-list",
      games: [],
    },
  ];
  return (
    <section className="grid gap-6 md:gap-8">
      <div className="flex flex-col gap-6 min-[1074px]:flex-row min-[1074px]:items-start min-[1074px]:justify-between min-[1074px]:gap-3">
        <div className="w-full md:w-96">
          <SearchInput placeholder="Search Your Lists..." />
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-x-2 gap-y-4 sm:grid-cols-[auto_1fr_auto] md:flex md:justify-end">
          <div className="mt-0.5 mb-0 md:mb-0 lg:mr-2">
            <CreateButton title="Create New List" className="w-full lg:w-fit" />
          </div>
          <div className="col-span-2 sm:col-span-1 sm:col-start-2 sm:row-start-1 md:content-end">
            <ListsFilter />
          </div>
          <div className="col-start-2 row-start-1 content-center sm:col-start-3 sm:content-start">
            <div className="flex items-center gap-2">
              <ViewSwitchButtons />
              <CollapseButton />
            </div>
          </div>
        </div>
      </div>

      <motion.div layout>
        {lists.length >= 1 && (
          <div className="mb-4">
            <p className="text-secondary">Total numbers of Lists: {lists.length}</p>
          </div>
        )}
        {lists.length >= 1 ? (
          lists.map((list) => <List key={list.id} />)
        ) : (
          <ContentNotFound
            title="No Lists Found"
            description="It looks like you haven't created any game lists yet."
            buttonTitle="Create Your First List"
            className="mt-6"
          />
        )}
      </motion.div>
    </section>
  );
}

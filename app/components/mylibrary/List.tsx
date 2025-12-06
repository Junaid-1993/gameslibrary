import ActionButton from "./ActionButton";
import { SquarePen, Pin, Copy, Trash2 } from "lucide-react";
import CollapseButton from "./CollapseButton";
import CreateButton from "../CreateButton";
import ContentNotFound from "../ContentNotFound";
import LinkWithArrow from "../LinkWithArrow";
import DropdownActionMenu from "../DropdownActionMenu";

export default function List() {
  const actionButtons = [
    { title: "Edit List", Icon: <SquarePen color="#818793" className="size-5" /> },
    { title: "Pin List", Icon: <Pin color="#818793" className="size-5" /> },
    { title: "Duplicate List", Icon: <Copy color="#818793" className="size-5" /> },
    { title: "Delete List", Icon: <Trash2 color="#EF4444" className="size-5" /> },
  ];
  return (
    <section className="border-border-400 grid gap-10 rounded-xl border px-4 py-3 sm:gap-14 sm:px-6 sm:py-5">
      <div className="grid gap-5">
        <div className="border-border-400 flex items-center justify-between border-b pb-3 sm:pb-5">
          <div className="gap-3.5 pt-[0.413rem] md:flex md:items-end md:gap-5">
            <h3 className="font-space-grotesk line-clamp-1 text-lg font-medium sm:text-xl">
              My First List
            </h3>
            <p className="text-secondary mt-2 text-sm md:mt-0">0 Titles</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex lg:items-center lg:gap-2">
              {actionButtons.map((action, id) => (
                <ActionButton key={id} title={action.title}>
                  {action.Icon}
                </ActionButton>
              ))}
            </div>
            <CollapseButton singleChevron />
            <div className="lg:hidden">
              <DropdownActionMenu />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <CreateButton title="Add Game to List" />
        </div>
      </div>
      <div>
        <ContentNotFound
          title="This list is currently empty"
          description="Start curating your personalized game collection by adding titles to this list."
          buttonTitle="Add Game to List"
        />
      </div>
      <div className="border-border-400 flex items-center justify-between border-t pt-3 sm:pt-5">
        <div>
          <span className="text-secondary text-sm">Created on May 10, 2025</span>
        </div>
        <div>
          <LinkWithArrow
            title="View Full List"
            href="#"
            // className="dark:hover:bg-accent-400 hover:text-background cursor-pointer transition duration-300 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
}

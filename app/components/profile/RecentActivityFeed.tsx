import { NotebookPen } from "lucide-react";
import RecentActivityItem, { Activity } from "./RecentActivityItem";

export default function RecentActivityFeed({ activities }: { activities: Activity[] }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="flex items-center justify-center py-6 md:h-full">
        <div className="flex flex-col items-center gap-3">
          <NotebookPen color="#818793" className="size-8" />
          <p className="text-secondary text-sm">No Recent Activity Yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-border-400 space-y-0 divide-y-1 py-2">
      {activities.map((activity, idx) => (
        <RecentActivityItem key={idx} activity={activity} />
      ))}
    </div>
  );
}

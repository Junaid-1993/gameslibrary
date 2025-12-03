import CreateButton from "./CreateButton";

export default function ContentNotFound({
  title,
  description,
  buttonTitle,
}: {
  title: string;
  description: string;
  buttonTitle: string;
}) {
  return (
    <div className="grid gap-2 text-center">
      <h4 className="font-space-grotesk text-lg font-medium xl:text-xl">{title}</h4>
      <p className="text-secondary">{description}</p>
      <div className="mt-7">
        <CreateButton title={buttonTitle} />
      </div>
    </div>
  );
}

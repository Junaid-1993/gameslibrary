import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

const MAX_CHARS = 280;

export default function TextareaWithCounter({
  ref,
  content,
  onChange,
}: {
  ref: React.Ref<HTMLTextAreaElement>;
  content: string;
  onChange: (text: string) => void;
}) {
  const currentChars = content.length;
  return (
    <div className="grid w-full gap-3">
      <Label htmlFor="summary">Summary</Label>
      <InputGroup>
        <InputGroupTextarea
          id="summary"
          ref={ref}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a grief summary of your thoughts (1-2 sentences)"
          maxLength={MAX_CHARS}
          className="border-border-400 min-h-35 text-sm lg:text-base"
        />
        <InputGroupAddon align="block-end" className="border-t">
          <InputGroupText
            className={`ml-auto text-sm ${
              currentChars > MAX_CHARS - 20 ? "text-danger-300" : "text-secondary"
            }`}
          >
            {currentChars}/{MAX_CHARS}
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

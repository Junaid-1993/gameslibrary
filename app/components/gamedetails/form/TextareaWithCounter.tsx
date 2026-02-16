import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

const MAX_CHARS = 280;

export default function TextareaWithCounter({
  id,
  ref,
  content,
  onChange,
  allowedCharacters,
  label,
  placeholder,
}: {
  id?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
  content: string | undefined;
  onChange: (text: string) => void;
  allowedCharacters?: number;
  label?: string;
  placeholder?: string;
}) {
  const currentChars = content?.length;

  return (
    <div className="grid w-full gap-3">
      <Label htmlFor={id || "summary"}>{label || "Summary"} </Label>
      <InputGroup>
        <InputGroupTextarea
          id={id || "summary"}
          ref={ref}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Write a grief summary of your thoughts (1-2 sentences)"}
          maxLength={allowedCharacters || MAX_CHARS}
          className="border-border-400 min-h-35 text-sm lg:text-base"
        />
        <InputGroupAddon align="block-end" className="border-t">
          <InputGroupText
            className={`ml-auto text-sm ${
              currentChars && currentChars > (allowedCharacters || MAX_CHARS) - 20
                ? "text-danger-300"
                : "text-secondary"
            }`}
          >
            {currentChars}/{allowedCharacters || MAX_CHARS}
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

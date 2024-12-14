import { Button } from "@chakra-ui/react";
import { useAlignDropdownMenuState } from "@udecode/plate-alignment/react";
import { setAlign, type Alignment } from "@udecode/plate-alignment";
import {
  focusEditor,
  useEditorRef,
  withRef,
} from "@udecode/plate-common/react";

type AlignButtonProps = {
  alignType: Alignment;
  icon: React.ReactNode;
};

export const AlignButton = withRef<typeof Button, AlignButtonProps>(
  ({ alignType, icon, ...rest }, ref) => {
    const editor = useEditorRef();
    const { value } = useAlignDropdownMenuState();

    const handleClick = () => {
      setAlign(editor, { value: alignType });
      focusEditor(editor);
    };

    const pressed = value === alignType;

    return (
      <Button
        w="30px"
        size="sm"
        px="2"
        variant={pressed ? "solid" : "outline"}
        onClick={handleClick}
        ref={ref}
        {...rest}
      >
        {icon}
      </Button>
    );
  }
);

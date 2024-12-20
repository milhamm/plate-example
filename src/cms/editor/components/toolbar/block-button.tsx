import { Button } from '@chakra-ui/react';
import {
  focusEditor,
  ParagraphPlugin,
  useEditorRef,
  useSelectionFragmentProp,
  withRef,
} from '@udecode/plate-common/react';

import { getBlockType, setBlockType } from '../../transforms';

type BlockButtonProps = {
  blockType: string;
  icon: React.ReactNode;
};

export const BlockButton = withRef<typeof Button, BlockButtonProps>(
  ({ blockType, icon, ...rest }, ref) => {
    const editor = useEditorRef();

    const value = useSelectionFragmentProp({
      defaultValue: ParagraphPlugin.key,
      getProp: (node) => getBlockType(node as any),
    });

    const handleClick = () => {
      setBlockType(editor, blockType);
      focusEditor(editor);
    };

    const pressed = blockType === value;

    return (
      <Button
        w={typeof icon !== 'string' ? '30px' : 'auto'}
        size="sm"
        px="2"
        variant={pressed ? 'solid' : 'outline'}
        ref={ref}
        onClick={handleClick}
        {...rest}
      >
        {icon}
      </Button>
    );
  },
);

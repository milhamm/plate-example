import { Button } from '@chakra-ui/react';
import { useEditorRef, withRef } from '@udecode/plate-common/react';

import { insertBlock } from '../../transforms';
import { TipsPlugin } from '../../plugins/tips-plugin';

type TipsButtonProps = {
  icon: React.ReactNode;
};

export const TipsButton = withRef<typeof Button, TipsButtonProps>(
  ({ icon, ...rest }, ref) => {
    const editor = useEditorRef();

    const handleClick = () => {
      // TODO: find out how to autofocus
      insertBlock(editor, TipsPlugin.key);
    };

    return (
      <Button
        w={typeof icon !== 'string' ? '30px' : 'auto'}
        size="sm"
        px="2"
        variant="outline"
        ref={ref}
        onClick={handleClick}
        {...rest}
      >
        {icon}
      </Button>
    );
  },
);

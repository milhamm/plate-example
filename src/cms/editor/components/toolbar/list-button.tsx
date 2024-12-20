import { Button } from '@chakra-ui/react';
import { withRef } from '@udecode/plate-common/react';
import {
  useListToolbarButton,
  useListToolbarButtonState,
} from '@udecode/plate-list/react';

type ListButtonProps = {
  listType: string;
  icon: React.ReactNode;
};

export const ListButton = withRef<typeof Button, ListButtonProps>(
  ({ listType, icon, ...rest }, ref) => {
    const state = useListToolbarButtonState({ nodeType: listType });
    const {
      props: { pressed, ...props },
    } = useListToolbarButton(state);

    return (
      <Button
        w="30px"
        size="sm"
        px="2"
        variant={pressed ? 'solid' : 'outline'}
        ref={ref}
        {...props}
        {...rest}
      >
        {icon}
      </Button>
    );
  },
);

import { Button } from '@chakra-ui/react';
import { useEditorRef, withRef } from '@udecode/plate-common/react';

import { ImagePlugin } from '@udecode/plate-media/react';

import { useFilePicker } from 'use-file-picker';
import { ImageIcon } from 'lucide-react';

type ImageButtonProps = {
  icon: React.ReactNode;
};

const MEDIA_CONFIG: Record<
  string,
  {
    accept: string[];
    icon: React.ReactNode;
    title: string;
    tooltip: string;
  }
> = {
  [ImagePlugin.key]: {
    accept: ['image/*'],
    icon: <ImageIcon className="size-4" />,
    title: 'Insert Image',
    tooltip: 'Image',
  },
};

export const ImageButton = withRef<typeof Button, ImageButtonProps>(
  ({ icon, ...rest }, ref) => {
    const editor = useEditorRef();

    const { openFilePicker } = useFilePicker({
      accept: MEDIA_CONFIG[ImagePlugin.key].accept,
      multiple: false,
      onFilesSelected: ({ plainFiles: updatedFiles }) => {
        (editor as any).tf.insert.media(updatedFiles);
      },
    });

    const handleClick = () => {
      openFilePicker();
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

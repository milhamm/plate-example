import { chakra, Box, Flex, Spinner, Image } from '@chakra-ui/react';
import {
  findNodePath,
  PlateElement,
  useEditorPlugin,
  withHOC,
  withRef,
} from '@udecode/plate-common/react';
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  PlaceholderPlugin,
  PlaceholderProvider,
  // updateUploadHistory,
  VideoPlugin,
} from '@udecode/plate-media/react';
import { TPlaceholderElement } from '@udecode/plate-media';
import { useFilePicker } from 'use-file-picker';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { AudioLines, FileUp, Film, ImageIcon } from 'lucide-react';
import { useUploadFile } from '../hooks/useUploadFile';
import {
  insertNodes,
  removeNodes,
  withoutSavingHistory,
} from '@udecode/plate-common';

const CONTENT: Record<
  string,
  {
    accept: string[];
    content: ReactNode;
    icon: ReactNode;
  }
> = {
  [AudioPlugin.key]: {
    accept: ['audio/*'],
    content: 'Add an audio file',
    icon: <AudioLines />,
  },
  [FilePlugin.key]: {
    accept: ['*'],
    content: 'Add a file',
    icon: <FileUp />,
  },
  [ImagePlugin.key]: {
    accept: ['image/*'],
    content: 'Add an image',
    icon: <ImageIcon />,
  },
  [VideoPlugin.key]: {
    accept: ['video/*'],
    content: 'Add a video',
    icon: <Film />,
  },
};

export const MediaPlaceholderElement = withHOC(
  PlaceholderProvider,
  withRef<typeof PlateElement>(({ children, ...props }, ref) => {
    const editor = props.editor;
    const element = props.element as TPlaceholderElement;

    const { api } = useEditorPlugin(PlaceholderPlugin);

    const currentContent = CONTENT[ImagePlugin.key];
    const isImage = element.mediaType === ImagePlugin.key;

    const imageRef = useRef<HTMLImageElement>(null);

    const { isUploading, progress, uploadFile, uploadedFile, uploadingFile } =
      useUploadFile();

    const loading = isUploading && uploadingFile;

    const replaceCurrentPlaceholder = useCallback(
      (file: File) => {
        void uploadFile(file);
        api.placeholder.addUploadingFile(element.id as string, file);
      },
      [api.placeholder, element.id, uploadFile],
    );

    const { openFilePicker } = useFilePicker({
      accept: currentContent.accept,
      multiple: false,
      onFilesSelected: ({ plainFiles: updatedFiles }) => {
        const firstFile = updatedFiles[0];
        replaceCurrentPlaceholder(firstFile);
      },
    });

    useEffect(() => {
      if (!uploadedFile) return;

      const path = findNodePath(editor, element);

      withoutSavingHistory(editor, () => {
        removeNodes(editor, { at: path });
        const node = {
          children: [{ text: '' }],
          initialHeight: imageRef.current?.height,
          initialWidth: imageRef.current?.width,
          isUpload: true,
          name: element.mediaType === FilePlugin.key ? uploadedFile.name : '',
          placeholderId: element.id as string,
          type: element.mediaType!,
          url: uploadedFile.url,
        };
        insertNodes(editor, node, { at: path });
      });

      api.placeholder.removeUploadingFile(element.id as string);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadedFile, element.id]);

    // React dev mode will call useEffect twice
    const isReplaced = useRef(false);

    /** Paste and drop */
    useEffect(() => {
      if (isReplaced.current) return;

      isReplaced.current = true;
      const currentFiles = api.placeholder.getUploadingFile(
        element.id as string,
      );

      if (!currentFiles) return;

      replaceCurrentPlaceholder(currentFiles);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReplaced]);

    return (
      <PlateElement ref={ref} {...props}>
        {(!loading || !isImage) && (
          <Flex cursor="pointer" onClick={() => loading && openFilePicker()}>
            <Flex position="relative" marginRight="3">
              {currentContent.icon}
            </Flex>
            <Box>
              <Box>{loading ? uploadingFile.name : currentContent.content}</Box>
            </Box>
          </Flex>
        )}
        {isImage && loading && (
          <ImageProgress
            file={uploadingFile}
            imageRef={imageRef}
            progress={progress}
          />
        )}
        {children}
      </PlateElement>
    );
  }),
);

export function ImageProgress({
  file,
  imageRef,
  progress = 0,
}: {
  file: File;
  imageRef?: React.RefObject<HTMLImageElement>;
  progress?: number;
}) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!objectUrl) return null;

  return (
    <Box contentEditable={false} position="relative">
      <Image
        h="auto"
        w="full"
        rounded="sm"
        objectFit="cover"
        ref={imageRef}
        alt={file.name}
        src={objectUrl}
      />
      {progress < 100 && (
        <Flex
          position="absolute"
          bottom="3"
          right="3"
          alignItems="center"
          rounded="lg"
          bg="blackAlpha.500"
          px="1"
          py="0.5"
          gap="2"
        >
          <Spinner />
          <chakra.span fontSize="xs" fontWeight="medium" color="white">
            {Math.round(progress)}%
          </chakra.span>
        </Flex>
      )}
    </Box>
  );
}

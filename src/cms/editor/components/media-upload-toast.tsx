import { useEffect } from 'react';

import { useEditorRef } from '@udecode/plate-common/react';
import { PlaceholderPlugin, UploadErrorCode } from '@udecode/plate-media/react';

import { useToast } from '@chakra-ui/react';

// eslint-disable-next-line react-refresh/only-export-components
export const useUploadErrorToast = () => {
  const editor = useEditorRef();
  const toast = useToast();

  const uploadError = editor.useOption(PlaceholderPlugin, 'error');

  useEffect(() => {
    if (!uploadError) return;

    const { code, data } = uploadError;

    switch (code) {
      case UploadErrorCode.INVALID_FILE_SIZE: {
        toast({
          status: 'error',
          description: `The size of files ${data.files
            .map((f) => f.name)
            .join(', ')} is invalid`,
        });

        break;
      }
      case UploadErrorCode.INVALID_FILE_TYPE: {
        toast({
          status: 'error',
          description: `The type of files ${data.files
            .map((f) => f.name)
            .join(', ')} is invalid`,
        });

        break;
      }
      case UploadErrorCode.TOO_LARGE: {
        toast({
          status: 'error',
          description: `The size of files ${data.files
            .map((f) => f.name)
            .join(', ')} is too large than ${data.maxFileSize}`,
        });

        break;
      }
      case UploadErrorCode.TOO_LESS_FILES: {
        toast({
          status: 'error',
          description: `The mini um number of files is ${data.minFileCount} for ${data.fileType}`,
        });

        break;
      }
      case UploadErrorCode.TOO_MANY_FILES: {
        toast({
          status: 'error',
          description: `The maximum number of files is ${data.maxFileCount} ${
            data.fileType ? `for ${data.fileType}` : ''
          }`,
        });

        break;
      }
    }
  }, [toast, uploadError]);
};

export const MediaUploadToast = () => {
  useUploadErrorToast();

  return null;
};

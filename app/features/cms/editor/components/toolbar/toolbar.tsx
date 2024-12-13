import { Flex } from "@chakra-ui/react";
import { MarkButton } from "./mark-button";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";

export function Toolbar() {
  return (
    <Flex
      position="sticky"
      top="0"
      w="100%"
      px={2}
      py={4}
      justifyContent="space-between"
      borderBottom="1px solid #f0f0f0"
      bg="white"
      zIndex="30"
    >
      <Flex ml="16" gap="1">
        <MarkButton nodeType={BoldPlugin.key} icon={<BoldIcon />} />
        <MarkButton nodeType={ItalicPlugin.key} icon={<ItalicIcon />} />
        <MarkButton nodeType={UnderlinePlugin.key} icon={<UnderlineIcon />} />
      </Flex>
    </Flex>
  );
}

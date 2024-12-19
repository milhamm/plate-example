import { Divider, Flex } from "@chakra-ui/react";
import { MarkButton } from "./mark-button";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  PilcrowIcon,
  UnderlineIcon,
} from 'lucide-react';
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { BlockButton } from "./block-button";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { ParagraphPlugin } from "@udecode/plate-common/react";
import { AlignButton } from "./align-button";
import { ListButton } from "./list-button";
import {
  BulletedListPlugin,
  NumberedListPlugin,
} from "@udecode/plate-list/react";
import { TipsPlugin } from "../../plugins/tips-plugin";

export function Toolbar() {
  return (
    <Flex
      position="sticky"
      top="0"
      w="100%"
      py={4}
      justifyContent="space-between"
      borderBottom="1px solid #f0f0f0"
      bg="white"
      zIndex="30"
    >
      <Flex gap="1">
        <MarkButton nodeType={BoldPlugin.key} icon={<BoldIcon />} />
        <MarkButton nodeType={ItalicPlugin.key} icon={<ItalicIcon />} />
        <MarkButton nodeType={UnderlinePlugin.key} icon={<UnderlineIcon />} />
        <Divider mx="1" orientation="vertical" />
        <BlockButton blockType={HEADING_KEYS.h1} icon={<Heading1Icon />} />
        <BlockButton blockType={HEADING_KEYS.h2} icon={<Heading2Icon />} />
        <BlockButton blockType={HEADING_KEYS.h3} icon={<Heading3Icon />} />
        <BlockButton blockType={ParagraphPlugin.key} icon={<PilcrowIcon />} />
        <BlockButton blockType={TipsPlugin.key} icon={'Insert Tips'} />
        <Divider mx="1" orientation="vertical" />
        <AlignButton alignType="left" icon={<AlignLeftIcon />} />
        <AlignButton alignType="center" icon={<AlignCenterIcon />} />
        <AlignButton alignType="right" icon={<AlignRightIcon />} />
        <AlignButton alignType="justify" icon={<AlignJustifyIcon />} />
        <Divider mx="1" orientation="vertical" />
        <ListButton listType={BulletedListPlugin.key} icon={<ListIcon />} />
        <ListButton
          listType={NumberedListPlugin.key}
          icon={<ListOrderedIcon />}
        />
      </Flex>
    </Flex>
  );
}

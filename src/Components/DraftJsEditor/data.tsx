import React from "react";
import { MenuBtnIconLookup } from "./MenuBtnIconLookup";

export type InlineStyleButtonsType = {
  value: string;
  style: string;
  icon?: any;
};

export const inlineBtns: InlineStyleButtonsType[] = [
  {
    value: "B",
    style: "BOLD",
    icon: <MenuBtnIconLookup icon="FormatBoldIcon" />
  },

  {
    value: "I",
    style: "ITALIC",
    icon: <MenuBtnIconLookup icon="FormatItalicIcon" />
  },

  {
    value: "U",
    style: "UNDERLINE",
    icon: <MenuBtnIconLookup icon="FormatUnderlinedIcon" />
  },

  {
    value: "Strikethrough",
    style: "STRIKETHROUGH"
  },

  {
    value: "<>",
    style: "CODE",
    icon: <MenuBtnIconLookup icon="CodeIcon" />
  },

  {
    value: "Highlight",
    style: "HIGHLIGHT"
  }
];

export type BlockLevelButtonsType = {
  value: string;
  block: string;
  icon?: any;
};
export const blockBtns: BlockLevelButtonsType[] = [
  {
    value: "H1",
    block: "header-one"
  },

  {
    value: "H2",
    block: "header-two"
  },

  {
    value: "H3",
    block: "header-three"
  },

  {
    value: "Blockquote",
    block: "blockquote"
  },

  {
    value: "Unordered List",
    block: "unordered-list-item",
    icon: <MenuBtnIconLookup icon="FormatListBulletedIcon" />
  },

  {
    value: "Ordered List",
    block: "ordered-list-item",
    icon: <MenuBtnIconLookup icon="FormatListNumberedIcon" />
  }
];

export type CustomStyleType = "HIGHLIGHT" | "PAINT" | "ALIGN";

export type StyleMapType =
  | { type: "HIGHLIGHT" }
  | { type: "PAINT"; payload: any }
  | { type: "ALIGN"; payload: any };

export type DispatchStyles = (
  type: CustomStyleType,
  payload: any,
  isInlineElement: boolean
) => void;

export const styleMap = {
  HIGHLIGHT: {
    backgroundColor: "#faed27"
  },
  PAINT: {
    color: "#000"
  },
  ALIGN: {
    textAlign: "left"
  }
};

export type CssButtonsType = {
  value: string;
  style: CustomStyleType;
  css?: any;
  icon?: any;
  isInlineElement?: boolean;
};

export const cssBtns: CssButtonsType[] = [
  {
    value: "left",
    style: "ALIGN",
    css: {
      textAlign: "left"
    },
    icon: <MenuBtnIconLookup icon="FormatAlignLeftIcon" />,
    isInlineElement: false
  },

  {
    value: "right",
    style: "ALIGN",
    css: {
      textAlign: "right"
    },
    icon: <MenuBtnIconLookup icon="FormatAlignRightIcon" />,
    isInlineElement: false
  },

  {
    value: "center",
    style: "ALIGN",
    css: {
      textAlign: "center"
    },
    icon: <MenuBtnIconLookup icon="FormatAlignCenterIcon" />,
    isInlineElement: false
  }
];

export const toolBarBtns = { cssBtns, blockBtns, inlineBtns };

export type TagType = "toggleInlineStyle" | "toggleBlockType";

export interface KeyCommands {
  key: string;
  value: string;
  type: TagType;
}

export const keyCommands: KeyCommands[] = [
  {
    key: "strikethrough",
    value: "STRIKETHROUGH",
    type: "toggleInlineStyle"
  },
  {
    key: "highlight",
    value: "HIGHLIGHT",
    type: "toggleInlineStyle"
  },
  {
    key: "paint",
    value: "PAINT",
    type: "toggleInlineStyle"
  },
  {
    key: "blockquote",
    value: "blockquote",
    type: "toggleBlockType"
  },
  {
    key: "ordered-list",
    value: "ordered-list-item",
    type: "toggleBlockType"
  },
  {
    key: "unordered-list",
    value: "unordered-list-item",
    type: "toggleBlockType"
  }
];

import React from "react";
import { MenuBtnIconLookup } from "./MenuBtnIconLookup";
import { black } from "color-name";

export type InlineStyleButtonsType = {
  value: string;
  style: string;
  icon?: any;
};

export const inlineStyleButtons: InlineStyleButtonsType[] = [
  {
    value: "B",
    style: "BOLD"
  },

  {
    value: "I",
    style: "ITALIC"
  },

  {
    value: "U",
    style: "UNDERLINE"
  },

  {
    value: "Strikethrough",
    style: "STRIKETHROUGH"
  },

  {
    value: "<>",
    style: "CODE"
  },

  {
    value: "Highlight",
    style: "HIGHLIGHT"
  },

  {
    icon: <MenuBtnIconLookup icon="PaletteIcon" />,
    value: "PaletteIcon",
    style: "ColorPicker"
  }
];

export type BlockLevelButtonsType = {
  value: string;
  block: string;
  icon?: any;
};
export const blockLevelButtons: BlockLevelButtonsType[] = [
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
    block: "unordered-list-item"
  },

  {
    value: "Ordered List",
    block: "ordered-list-item"
  }
];

export const styleMap = {
  HIGHLIGHT: {
    backgroundColor: "#faed27"
  },
  PAINT: {
    color: "red"
  }
};

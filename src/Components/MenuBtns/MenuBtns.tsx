import React from "react";

import { EditorState, RichUtils } from "draft-js";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { ChildrenType } from "../../globalTypes";
import { DispatchStyles, CustomStyleType } from "../DraftJsEditor/data";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      minWidth: 45,
      height: 45,
      border: "1px solid #eee",
      backgroundColor: "#fff",
      borderRadius: 5,
      cursor: "pointer",
      marginRight: 2,
      marginBottom: 2,

      "&:active": {
        transform: "scale(.95)",
      },

      "&:hover": {
        backgroundColor: "#eee",
      },
    },
    activeButton: {
      backgroundColor: "turquoise",
      borderColor: "transparent",
    },
    buttonsGroup: {
      display: "flex",
      // justifyContent: "space-between",
      flexWrap: "wrap",
      padding: 5,
    },
  })
);

export interface BlockElmBtnProps {
  editorState: EditorState;
  value: string;
  block: string;
  handleClick: (event: any) => void;
  children: ChildrenType;
}

export const BlockElmBtn: React.FC<BlockElmBtnProps> = ({
  editorState,
  value,
  block,
  handleClick,
  children,
}) => {
  const classes = useStyles();
  const handleMouseDown = (e: any) => e.preventDefault();

  return (
    <button
      type="button"
      key={block}
      // value={value}
      className={clsx(
        classes.button,
        RichUtils.getCurrentBlockType(editorState) === block &&
          classes.activeButton
      )}
      data-block={block}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      {children}
    </button>
  );
};

export interface InlineElmBtnProps {
  editorState: EditorState;
  value: string;
  style: string;
  handleClick: (event: any) => void;
  children: ChildrenType;
}

export const InlineElmBtn: React.FC<InlineElmBtnProps> = ({
  editorState,
  value,
  style,
  handleClick,
  children,
}) => {
  const classes = useStyles();
  const handleMouseDown = (e: any) => e.preventDefault();

  return (
    <button
      type="button"
      key={style}
      // value={value}
      className={clsx(
        classes.button,
        editorState.getCurrentInlineStyle().has(style) && classes.activeButton
      )}
      data-style={style}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      {children}
    </button>
  );
};

export interface InlineCSSBtnProps {
  editorState: EditorState;
  value: string;
  style: CustomStyleType;
  isInlineElement?: boolean;
  css: any;
  dispatchStyle: DispatchStyles;
  children: ChildrenType;
}

export const InlineCSSBtn: React.FC<InlineCSSBtnProps> = ({
  editorState,
  value,
  style,
  isInlineElement = true,
  css,
  dispatchStyle,
  children,
}) => {
  const classes = useStyles();
  const handleMouseDown = (e: any) => e.preventDefault();

  const handleClick = (e: any) => {
    dispatchStyle(style, css, isInlineElement);
  };

  return (
    <button
      type="button"
      key={style}
      // value={value}
      className={clsx(
        classes.button,
        RichUtils.getCurrentBlockType(editorState) === style &&
          classes.activeButton
      )}
      data-style={style}
      data-css={css}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      {children}
    </button>
  );
};

export const TestBtn: React.FC<InlineCSSBtnProps> = ({
  editorState,
  value,
  style,
  isInlineElement = true,
  css,
  dispatchStyle,
  children,
}) => {
  const classes = useStyles();
  const handleMouseDown = (e: any) => e.preventDefault();

  const handleClick = (e: any) => {
    dispatchStyle(style, css, isInlineElement);
  };

  return (
    <button
      type="button"
      key={style}
      // value={value}
      className={clsx(
        classes.button,
        editorState.getCurrentInlineStyle().has(style) && classes.activeButton
      )}
      data-style={style}
      data-css={css}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      {children}
    </button>
  );
};

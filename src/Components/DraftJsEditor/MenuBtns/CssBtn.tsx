import React from "react";

import { EditorState, RichUtils } from "draft-js";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { ChildrenType } from "../../../globalTypes";
import { DispatchStyles, CustomStyleType } from "../data";

import { styles } from "./btn.style";

const useStyles = makeStyles((theme: Theme) => createStyles(styles));

export interface Props {
  editorState: EditorState;
  value: string;
  style: CustomStyleType;
  isInlineElement?: boolean;
  css: any;
  dispatchStyle: DispatchStyles;
  children: ChildrenType;
}

export const CssBtn: React.FC<Props> = ({
  editorState,
  value,
  style,
  isInlineElement = true,
  css,
  dispatchStyle,
  children
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

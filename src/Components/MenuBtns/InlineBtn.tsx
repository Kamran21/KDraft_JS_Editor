import React from "react";

import { EditorState, RichUtils } from "draft-js";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { ChildrenType } from "../../globalTypes";
import { DispatchStyles, CustomStyleType } from "../DraftJsEditor/data";
import {styles} from './btn.style'

const useStyles = makeStyles((theme: Theme) =>
  createStyles(styles)
);

export interface Props {
  editorState: EditorState;
  value: string;
  style: string;
  handleClick: (event: any) => void;
  children: ChildrenType;
}

export const InlineBtn: React.FC<Props> = ({
  editorState,
  value,
  style,
  handleClick,
  children
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
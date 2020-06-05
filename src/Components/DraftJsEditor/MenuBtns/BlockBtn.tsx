import React from "react";
import { EditorState, RichUtils } from "draft-js";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { ChildrenType } from "../../../globalTypes";
import {styles} from './btn.style'

const useStyles = makeStyles((theme: Theme) =>
  createStyles(styles)
);

export interface Props {
  editorState: EditorState;
  value: string;
  block: string;
  handleClick: (event: any) => void;
  children: ChildrenType;
}

export const BlockBtn: React.FC<Props> = ({
  editorState,
  value,
  block,
  handleClick,
  children
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
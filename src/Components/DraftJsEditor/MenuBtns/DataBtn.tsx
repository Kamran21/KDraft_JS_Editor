import React from "react";
import { EditorState } from "draft-js";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { ChildrenType } from "../../../globalTypes";
import { styles } from "./btn.style";
import { applyEntityWithData } from "../applyEntityWithData";

const useStyles = makeStyles((theme: Theme) => createStyles(styles));

export interface Props {
  editorState: EditorState;
  style: string;
  blockType: string;
  data: any;
  setEditorState: (editorState: EditorState) => void;
  children?: ChildrenType;
}

export const DataBtn: React.FC<Props> = ({
  editorState,
  style,
  blockType,
  data,
  setEditorState,
  children,
}) => {
  const classes = useStyles();
  const handleMouseDown = (e: any) => e.preventDefault();

  const handleClick = (e: any) => {
    const newEditorState = applyEntityWithData(editorState, "META_WRAPPER", {
      elementType: "MW_LINK",
      id: "abc-123",
      url: "#targetDiv",
      text: "Link to target div",
    });
    setEditorState(newEditorState);
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
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      {children}
    </button>
  );
};

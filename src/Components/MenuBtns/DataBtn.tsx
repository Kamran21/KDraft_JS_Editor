import React from "react";

import { EditorState, Modifier } from "draft-js";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { ChildrenType } from "../../globalTypes";
// @ts-ignore
import * as Modifiers from "draft-js-modifiers";

import {styles} from './btn.style'

const useStyles = makeStyles((theme: Theme) =>
  createStyles(styles)
);


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
  children
}) => {
  const classes = useStyles();
  const handleMouseDown = (e: any) => e.preventDefault();

  const handleClick = (e: any) => {
    // Todo create block with meta data and add it to the editorState, Send the newEditorState
    const mutabilaty = "IMMUTABLE";

    const contentstate = editorState.getCurrentContent();

    // the entity is created from the content state and returns the actual entety
    // we don't need the actual entety but we do need a key
    contentstate.createEntity("myEntityIdentifier", mutabilaty, {
      storedText: data
    });

    // This is how we get the key
    const entityKey = contentstate.getLastCreatedEntityKey();

    // get the current selection
    const selectionState = editorState.getSelection();

    // associate the text in the selection (from - to) to the entety and get a new content state
    const newContentState = Modifier.applyEntity(
      contentstate,
      selectionState,
      entityKey
    );

    // add the new content state to the existing editor state and return a new editorstate
    let newEditorState = EditorState.push(
      editorState,
      newContentState,
      "apply-entity"
    );

    // update the Edit controll
    setEditorState(newEditorState);

    newEditorState = Modifiers.insertNewBlock(
      editorState,
      blockType,
      "MyLink Ohh",
      data
    );
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

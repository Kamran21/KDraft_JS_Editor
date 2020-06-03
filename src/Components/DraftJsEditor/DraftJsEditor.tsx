import React, { useState, useReducer } from "react";

import { Editor, EditorState, RichUtils, ContentBlock } from "draft-js";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  styleMap,
  StyleMapType,
  CustomStyleType,
  toolBarBtns,
  keyCommands,
  KeyCommands
} from "./data";

import { ToolBar } from "../ToolBar/ToolBar";
import { keyBindingFn } from "./keyBindingFn";
import { blockRendererFn, extendedBlockRenderMap } from "./CustomBlocks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 500,
      margin: "50px auto"
    },
    editorWrapper: {
      border: "1px solid #ccc"
    },
    editorContent: {
      minHeight: 250,
      padding: 5
    },
    buttonsGroup: {
      display: "flex",
      // justifyContent: "space-between",
      flexWrap: "wrap",
      padding: 5
    },
    unorderedListItem: {
      color: "red"
    }
  })
);

export const DraftJsEditor: React.FC = () => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const customeStylesReducer = (state: any, action: StyleMapType) => {
    switch (action.type) {
      case "PAINT":
        return { ...state, [action.type]: action.payload };
      case "ALIGN":
        return { ...state, [action.type]: action.payload };
      default:
        return state;
    }
  };

  const [customeStyles, dispatchCustomStyles] = useReducer(
    customeStylesReducer,
    styleMap
  );

  const handleDispatchCustomStyle = (
    type: CustomStyleType,
    payload: any,
    isInlineElement: boolean = true
  ) => {
    dispatchCustomStyles({ type, payload });
    setStyle(type, isInlineElement ? "style" : "block");
  };

  const setStyle = (data: string, type: string) =>
    type === "style"
      ? setEditorState(RichUtils.toggleInlineStyle(editorState, data))
      : setEditorState(RichUtils.toggleBlockType(editorState, data));

  const onChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const handleKeyCommand = (command: string) => {
    // inline formatting key commands handles bold, italic, code, underline
    let newEditorState: EditorState | null;
    newEditorState = RichUtils.handleKeyCommand(editorState, command);

    keyCommands.forEach((keyCommand: KeyCommands) => {
      if (!newEditorState && command === keyCommand.key) {
        newEditorState = RichUtils[keyCommand.type](
          editorState,
          keyCommand.value
        );
      }
    });

    if (newEditorState) {
      setEditorState(newEditorState);
      return "handled";
    }

    return "not-handled";
  };

  const myBlockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    if (type === "unordered-list-item") {
      return classes.unorderedListItem;
    }
    return "";
  };

  return (
    <div className={classes.root}>
      {/* <h2>Draft.JS Editor</h2> */}
      <div className={classes.editorWrapper}>
        <ToolBar
          editorState={editorState}
          btns={toolBarBtns}
          setStyle={setStyle}
          dispatch={handleDispatchCustomStyle}
          setEditorState={onChange}
        />
      </div>

      <div className={clsx(classes.editorWrapper, classes.editorContent)}>
        <Editor
          placeholder={"Start typing!"}
          //State
          editorState={editorState}
          onChange={onChange}
          //Keys
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFn}
          //Styles
          customStyleMap={customeStyles}
          blockStyleFn={myBlockStyleFn}
          //Blocks
          blockRenderMap={extendedBlockRenderMap}
          blockRendererFn={blockRendererFn({ name: "meta-data-block" })}
        />
      </div>
    </div>
  );
};

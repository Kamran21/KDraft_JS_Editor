import React, { useState, useReducer } from "react";

import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
} from "draft-js";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { styleMap, StyleMapType, CustomStyleType, toolBarBtns } from "./data";

import { KeyValueMap } from "../../globalTypes";
import { ToolBar } from "../ToolBar/ToolBar";

const BlockWithMetaDataWrapper: React.FC = (props: any) => {
  const { block, contentState, children, blockProps } = props;
  const data = contentState.getEntity(block.getEntityAt(0)).getData();
  return <div {...blockProps}>{children}</div>;
};

const myBlockRenderer = (data: KeyValueMap) => (contentBlock: any) => {
  const type = contentBlock.getType();
  if (type === "meta-block") {
    return {
      component: BlockWithMetaDataWrapper,
      editable: false,
      props: data,
    };
  }
};

function keyBindingFunction(event: any) {
  if (
    KeyBindingUtil.hasCommandModifier(event) &&
    event.shiftKey &&
    (event.key === "x" || event.key === "X")
  ) {
    return "strikethrough";
  }

  if (
    KeyBindingUtil.hasCommandModifier(event) &&
    event.shiftKey &&
    event.key === "7"
  ) {
    return "ordered-list";
  }

  if (
    KeyBindingUtil.hasCommandModifier(event) &&
    event.shiftKey &&
    event.key === "8"
  ) {
    return "unordered-list";
  }

  if (
    KeyBindingUtil.hasCommandModifier(event) &&
    event.shiftKey &&
    event.key === "9"
  ) {
    return "blockquote";
  }

  if (
    KeyBindingUtil.hasCommandModifier(event) &&
    event.shiftKey &&
    (event.key === "h" || event.key === "H")
  ) {
    return "highlight";
  }

  if (
    KeyBindingUtil.hasCommandModifier(event) &&
    event.shiftKey &&
    (event.key === "p" || event.key === "P")
  ) {
    return "paint";
  }

  return getDefaultKeyBinding(event);
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 500,
      margin: "50px auto",
    },

    editorWrapper: {
      border: "1px solid #ccc",
    },
    editorContent: {
      minHeight: 250,
      padding: 5,
    },
    buttonsGroup: {
      display: "flex",
      // justifyContent: "space-between",
      flexWrap: "wrap",
      padding: 5,
    },
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
    isInlineElement ? setStyle(type, "style") : setStyle(type, "block");
  };

  const onChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const handleKeyCommand = (command: string) => {
    // inline formatting key commands handles bold, italic, code, underline
    let newEditorState;
    newEditorState = RichUtils.handleKeyCommand(editorState, command);

    if (!newEditorState && command === "strikethrough") {
      newEditorState = RichUtils.toggleInlineStyle(
        editorState,
        "STRIKETHROUGH"
      );
    }

    if (!newEditorState && command === "blockquote") {
      newEditorState = RichUtils.toggleBlockType(editorState, "blockquote");
    }

    if (!newEditorState && command === "ordered-list") {
      newEditorState = RichUtils.toggleBlockType(
        editorState,
        "ordered-list-item"
      );
    }

    if (!newEditorState && command === "unordered-list") {
      newEditorState = RichUtils.toggleBlockType(
        editorState,
        "unordered-list-item"
      );
    }

    if (!newEditorState && command === "highlight") {
      newEditorState = RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT");
    }

    if (!newEditorState && command === "paint") {
      newEditorState = RichUtils.toggleInlineStyle(editorState, "PAINT");
    }

    if (newEditorState) {
      setEditorState(newEditorState);
      return "handled";
    }

    return "not-handled";
  };

  const setStyle = (data: string, type: string) =>
    type === "style"
      ? setEditorState(RichUtils.toggleInlineStyle(editorState, data))
      : setEditorState(RichUtils.toggleBlockType(editorState, data));

  return (
    <div className={classes.root}>
      <h2>Draft.JS Editor</h2>
      <div className={classes.editorWrapper}>
        <ToolBar
          editorState={editorState}
          btns={toolBarBtns}
          setStyle={setStyle}
          dispatch={handleDispatchCustomStyle}
        />
      </div>

      <div className={clsx(classes.editorWrapper, classes.editorContent)}>
        <Editor
          customStyleMap={customeStyles}
          placeholder={"Start typing!"}
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFunction}
          blockRendererFn={myBlockRenderer({ name: "meta-data-block" })}
        />
      </div>
    </div>
  );
};

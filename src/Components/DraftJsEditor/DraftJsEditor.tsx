import React, { useState } from "react";

import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil
} from "draft-js";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { inlineStyleButtons, blockLevelButtons, styleMap } from "./data";

import { InlineElmBtn, BlockElmBtn } from "../MenuBtns/MenuBtns";

function keyBindingFunction(event: any) {
  if (
    KeyBindingUtil.hasCommandModifier(event) &&
    event.shiftKey &&
    event.key === "x"
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
    event.key === "h"
  ) {
    return "highlight";
  }

  return getDefaultKeyBinding(event);
}

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
    }
  })
);

export const DraftJsEditor: React.FC = () => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

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

    if (newEditorState) {
      setEditorState(editorState);
      return "handled";
    }

    return "not-handled";
  };

  const toggleInlineStyle = (event: any) => {
    event.preventDefault();
    let style = event.currentTarget.getAttribute("data-style");
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (event: any) => {
    event.preventDefault();
    let block = event.currentTarget.getAttribute("data-block");
    setEditorState(RichUtils.toggleBlockType(editorState, block));
  };

  return (
    <div className={classes.root}>
      <h2>Draft.JS Editor</h2>
      <div className={classes.editorWrapper}>
        <div className={classes.buttonsGroup}>
          {inlineStyleButtons.map(button => {
            return (
              <InlineElmBtn
                style={button.style}
                value={button.value}
                editorState={editorState}
                handleClick={toggleInlineStyle}
              >
                {button.icon || button.value}
              </InlineElmBtn>
            );
          })}
        </div>

        <div className={classes.buttonsGroup}>
          {blockLevelButtons.map(button => {
            return (
              <BlockElmBtn
                block={button.block}
                value={button.value}
                editorState={editorState}
                handleClick={toggleBlockType}
              >
                {button.icon || button.value}
              </BlockElmBtn>
            );
          })}
        </div>
      </div>

      <div className={clsx(classes.editorWrapper, classes.editorContent)}>
        <Editor
          customStyleMap={styleMap}
          placeholder={"Start typing!"}
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFunction}
        />
      </div>
    </div>
  );
};

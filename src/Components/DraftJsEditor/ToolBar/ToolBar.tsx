import React from "react";
import { EditorState } from "draft-js";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CssBtn } from "../MenuBtns/CssBtn";
import { InlineBtn } from "../MenuBtns/InlineBtn";
import { BlockBtn } from "../MenuBtns/BlockBtn";
import { DataBtn } from "../MenuBtns/DataBtn";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import {
  InlineStyleButtonsType,
  BlockLevelButtonsType,
  CssButtonsType,
  CustomStyleType
} from "../data";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonsGroup: {
      display: "flex",
      flexWrap: "wrap",
      padding: 5
    }
  })
);

interface Props {
  editorState: EditorState;
  btns: {
    inlineBtns: InlineStyleButtonsType[];
    blockBtns: BlockLevelButtonsType[];
    cssBtns: CssButtonsType[];
  };
  setStyle: (data: string, type: string) => void;
  dispatch: (
    type: CustomStyleType,
    payload: any,
    isInlineElement?: boolean
  ) => void;
  setEditorState: (editorState: EditorState) => void;
}

export const ToolBar: React.FC<Props> = ({
  editorState,
  btns,
  setStyle,
  dispatch,
  setEditorState
}) => {
  const classes = useStyles();
  const { inlineBtns, blockBtns, cssBtns } = btns;

  const toggleStyle = (type: string) => (event: any) => {
    event.preventDefault();
    const data = event.currentTarget.getAttribute(`data-${type}`);
    setStyle(data, type);
  };

  return (
    <div>
      <div className={classes.buttonsGroup}>
        {inlineBtns.map(button => {
          return (
            <InlineBtn
              style={button.style}
              value={button.value}
              editorState={editorState}
              handleClick={toggleStyle("style")}
            >
              {button.icon || button.value}
            </InlineBtn>
          );
        })}
        <ColorPicker
          editorState={editorState}
          value="Paint"
          style="PAINT"
          dispatchStyle={dispatch}
        />
        <DataBtn
          style="DATA_BTN"
          blockType="meta-block"
          data={{ id: "1212121212" }}
          editorState={editorState}
          setEditorState={setEditorState}
        />
      </div>

      <div className={classes.buttonsGroup}>
        {blockBtns.map(button => {
          return (
            <BlockBtn
              block={button.block}
              value={button.value}
              editorState={editorState}
              handleClick={toggleStyle("block")}
            >
              {button.icon || button.value}
            </BlockBtn>
          );
        })}
      </div>

      <div className={classes.buttonsGroup}>
        {cssBtns.map(button => {
          return (
            <CssBtn
              style={button.style}
              value={button.value}
              css={button.css}
              isInlineElement={button.isInlineElement}
              editorState={editorState}
              dispatchStyle={dispatch}
            >
              {button.icon || button.value}
            </CssBtn>
          );
        })}
      </div>
    </div>
  );
};

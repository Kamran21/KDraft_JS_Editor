import React from "react";
import { EditorState } from "draft-js";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { InlineElmBtn, BlockElmBtn, InlineCSSBtn } from "../MenuBtns/MenuBtns";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import {
  InlineStyleButtonsType,
  BlockLevelButtonsType,
  CssButtonsType,
} from "../DraftJsEditor/data";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonsGroup: {
      display: "flex",
      flexWrap: "wrap",
      padding: 5,
    },
  })
);

interface Props {
  editorState: EditorState;
  btns: {
    inlineBtns: InlineStyleButtonsType[];
    blockBtns: BlockLevelButtonsType[];
    cssBtns: CssButtonsType[];
  };
  setStyle: any;
  dispatch: any;
}

export const ToolBar: React.FC<Props> = ({
  editorState,
  btns,
  setStyle,
  dispatch,
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
        {inlineBtns.map((button) => {
          return (
            <InlineElmBtn
              style={button.style}
              value={button.value}
              editorState={editorState}
              handleClick={toggleStyle("style")}
            >
              {button.icon || button.value}
            </InlineElmBtn>
          );
        })}
        <ColorPicker
          editorState={editorState}
          value="Paint"
          style="PAINT"
          dispatchStyle={dispatch}
        />
      </div>

      <div className={classes.buttonsGroup}>
        {blockBtns.map((button) => {
          return (
            <BlockElmBtn
              block={button.block}
              value={button.value}
              editorState={editorState}
              handleClick={toggleStyle("block")}
            >
              {button.icon || button.value}
            </BlockElmBtn>
          );
        })}
      </div>

      <div className={classes.buttonsGroup}>
        {cssBtns.map((button) => {
          return (
            <InlineCSSBtn
              style={button.style}
              value={button.value}
              css={button.css}
              isInlineElement={button.isInlineElement}
              editorState={editorState}
              dispatchStyle={dispatch}
            >
              {button.icon || button.value}
            </InlineCSSBtn>
          );
        })}
      </div>
    </div>
  );
};

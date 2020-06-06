import React from "react";

import { EditorState } from "draft-js";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { getContentAsRawJSON } from "../helpers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pre: {},
  })
);

interface Props {
  editorState: EditorState;
}
export const JsonEditorContent: React.FC<Props> = ({ editorState }) => {
  const classes = useStyles();
  return <pre className={classes.pre}>{getContentAsRawJSON(editorState)}</pre>;
};

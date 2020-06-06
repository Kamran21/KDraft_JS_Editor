import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { EditorState } from "draft-js";
import { Button, Grid } from "@material-ui/core";
import { setContentToLocalStorage } from "../helpers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(1),
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

interface Props {
  editorState: EditorState;
}

export const EditorActions: React.FC<Props> = ({ editorState }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} justify="flex-end">
      <Button
        variant="contained"
        onClick={() => setContentToLocalStorage("contentState", editorState)}
      >
        SAVE
      </Button>
    </Grid>
  );
};

import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { ContentBlock, ContentState } from "draft-js";
import { findWithRegex } from "./findWithRegex";

// Note: these aren't very good regexes, don't use them!
const HANDLE_REGEX = /\@[\w]+/g;

export const handleStrategy = (
  contentBlock: ContentBlock,
  callback: (a: any, b: any) => any,
  contentState: ContentState
) => {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    handle: {
      color: "red",
    },
  })
);

export const HandleSpan: React.FC = (props: any) => {
  const classes = useStyles();
  return (
    <span {...props} className={classes.handle}>
      {props.children}
    </span>
  );
};

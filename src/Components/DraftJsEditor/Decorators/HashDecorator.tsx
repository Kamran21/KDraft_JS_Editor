import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { ContentBlock, ContentState } from "draft-js";
import { findWithRegex } from "./findWithRegex";

// Note: these aren't very good regexes, don't use them!
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;

export const hashtagStrategy = (
  contentBlock: ContentBlock,
  callback: any,
  contentState: ContentState
) => {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hashtag: {
      color: "green",
    },
  })
);

export const HashtagSpan: React.FC = (props: any) => {
  const classes = useStyles();
  return (
    <span {...props} className={classes.hashtag}>
      {props.children}
    </span>
  );
};

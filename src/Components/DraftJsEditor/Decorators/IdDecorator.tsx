import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { ContentBlock, ContentState } from "draft-js";
import { findWithRegex } from "./findWithRegex";

// Note: these aren't very good regexes, don't use them!
const ID_REGEX = /\#[\w\u0590-\u05ff]+/g;
// const ID_REGEX = /^ID[\w\u0590-\u05ff]+/g;

export const idStrategy = (
  contentBlock: ContentBlock,
  callback: (a: any, b: any) => any,
  contentState: ContentState
) => {
  findWithRegex(ID_REGEX, contentBlock, callback);
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    idSpan: {
      color: "turquoise",
    },
  })
);

export const IDSpan: React.FC = (props: any) => {
  const classes = useStyles();

  let content = (
    <span {...props} className={classes.idSpan}>
      {props.children}
    </span>
  );

  const id = window.prompt("Add an id to the to the text wrapper", "");
  const newProps = id !== "" ? props : { ...props, id };

  if (id !== "") {
    const text = window.prompt("Enter text", "");
    if (text !== "") {
      content = (
        <span {...props} id={id} className={classes.idSpan}>
          {text}
        </span>
      );
    }
  }
  return content;
};

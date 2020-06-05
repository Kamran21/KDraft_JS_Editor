import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { ContentBlock, ContentState } from "draft-js";

export const customLinkStrategy = (
  contentBlock: ContentBlock,
  callback: (a: any, b: any) => any,
  contentState: ContentState
) => {
    contentBlock.findEntityRanges(
        (character) => {
          const entityKey = character.getEntity();
          return (
            entityKey !== null &&
            contentState.getEntity(entityKey).getType() === 'LINK'
          );
        },
        callback
      );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: "grey",
    },
  })
);

export const CustomLink: React.FC = (props: any) => {
  const classes = useStyles();

  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a rel="nofollow noreferrer" href={url} target="_blank" className={classes.link}>
      {props.children}
    </a>
  );
};

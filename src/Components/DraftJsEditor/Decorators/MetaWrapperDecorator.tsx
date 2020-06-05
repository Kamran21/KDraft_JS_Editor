import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { ContentBlock, ContentState } from "draft-js";

export const metaWrapperStrategy = (
  contentBlock: ContentBlock,
  callback: (a: any, b: any) => any,
  contentState: ContentState
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "META_WRAPPER"
    );
  }, callback);
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mwLink: {
      color: "purple",
    },
    mwSpan: {
      color: "orange",
    },
  })
);

export const MetaWrapper: React.FC = (props: any) => {
  const { elementType } = props.contentState
    .getEntity(props.entityKey)
    .getData();

  switch (elementType) {
    case "MW_LINK":
      return <MwLink {...props} />;
    default:
      //MW_SPAN
      return <MwSpan {...props} />;
  }
};

const MwLink: React.FC = (props: any) => {
  const classes = useStyles();
  const { id, url, text } = props.contentState
    .getEntity(props.entityKey)
    .getData();
  return (
    <a rel="nofollow noreferrer" id={id} href={url} className={classes.mwLink}>
      {text || props.children}
    </a>
  );
};

const MwSpan: React.FC = (props: any) => {
  const classes = useStyles();
  const { id } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <span id={id} className={classes.mwSpan}>
      MW_SPAN {props.children}
    </span>
  );
};

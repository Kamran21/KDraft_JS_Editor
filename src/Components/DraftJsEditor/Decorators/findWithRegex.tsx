import { ContentBlock } from "draft-js";

export const findWithRegex = (
  regex: RegExp,
  contentBlock: ContentBlock,
  callback: (a: any, b: any) => any
) => {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
};

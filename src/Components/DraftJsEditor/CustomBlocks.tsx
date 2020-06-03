import React from "react";
import Immutable from "immutable";
import Draft, { Editor } from "draft-js";
import { KeyValueMap, ChildrenType } from "../../globalTypes";

export const BlockWithMetaDataWrapper: React.FC = (props: any) => {
  const { block, contentState, children, blockProps } = props;
  const data = contentState.getEntity(block.getEntityAt(0)).getData();
  return (
    <div
      style={{ backgroundColor: "red", width: "50%", height: "80%" }}
      {...blockProps}
    >
      Hello{children}
    </div>
  );
};

export const blockRendererFn = (data: KeyValueMap) => (contentBlock: any) => {
  const type = contentBlock.getType();
  if (type === "meta-block") {
    return {
      component: BlockWithMetaDataWrapper,
      editable: false,
      props: data
    };
  }
};

const GreenBox: React.FC<{ children?: ChildrenType }> = ({ children }) => (
  <div style={{ backgroundColor: "green", width: "50%", height: "100px" }}>
    {children}
  </div>
);

export const blockRenderMap = Immutable.Map({
  "meta-block": {
    // the docs use 'MyCustomBlock', but I changed it to 'atomic' to make it easier to follow.
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: "section",
    wrapper: <GreenBox />
  }
});

// Include 'paragraph' as a valid block and updated the unstyled element but
// keep support for other draft default block types
export const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(
  blockRenderMap
);

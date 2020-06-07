import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  RawDraftContentState,
  convertFromHTML,
  ContentState,
} from "draft-js";

export const getContentAsRawJSON = (editorState: EditorState) => {
  const contentState = editorState.getCurrentContent();
  const raw = convertToRaw(contentState);
  return JSON.stringify(raw, null, 2);
};

export const setContentToLocalStorage = (
  key: string,
  editorState: EditorState
) => {
  localStorage.setItem(key, getContentAsRawJSON(editorState));
};

export const rawContentToEditorState = (
  rawSampleJson: RawDraftContentState
): EditorState => {
  const contentState = convertFromRaw(rawSampleJson);
  return EditorState.createWithContent(contentState);
};

export const htmlToEditorState = (htmlStr: string): EditorState => {
  const contentBlocks = convertFromHTML(htmlStr);
  const contentState = ContentState.createFromBlockArray(
    contentBlocks.contentBlocks,
    contentBlocks.entityMap
  );
  return EditorState.createWithContent(contentState);
};

export const getSelectionStateValues = (
  editorState: EditorState
): {
  offset: number;
  focusOffset: number;
  isBackwards: boolean;
} => {
  // the editorState ahs a setSelection() method to get the selection
  const selectionState = editorState.getSelection();

  // sample of some data we can get from the selection state
  const offset = selectionState.getAnchorOffset();
  const focusOffset = selectionState.getFocusOffset();
  const isBackwards = selectionState.getIsBackward();
  return {
    offset,
    focusOffset,
    isBackwards,
  };
};

export const setSelection = (editorState:EditorState,  offset: number, focusOffset: number):EditorState => {
  const selectionState = editorState.getSelection();
  // we cant set the selection state directly because its immutable.
  // so make a copy  
  const newSelection = selectionState.merge({
      anchorOffset: offset,
      focusOffset: focusOffset,
  }) as Draft.SelectionState;

  // Draft API helper set the selection into a new editorState
  return EditorState.forceSelection(editorState, newSelection);
}

import { EditorState, convertToRaw } from "draft-js";

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

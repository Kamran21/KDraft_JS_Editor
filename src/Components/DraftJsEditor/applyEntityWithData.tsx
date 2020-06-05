import { EditorState, Modifier } from "draft-js";
import { KeyValueMap } from "../../globalTypes";

export const applyEntityWithData = (
  editorState: EditorState,
  customEntityType: string,
  data: KeyValueMap
) => {
  const contentState = editorState.getCurrentContent();

  // the entity is created from the content state and returns the actual entity
  // we don't need the actual entity but we do need a key
  contentState.createEntity(customEntityType, "IMMUTABLE", data);

  // This is how we get the key
  const entityKey = contentState.getLastCreatedEntityKey();

  // get the current selection
  const selectionState = editorState.getSelection();

  // associate the text in the selection (from - to) to the entity and get a new content state
  const newContentState = Modifier.applyEntity(
    contentState,
    selectionState,
    entityKey
  );

  // add the new content state to the existing editor state and return a new editorstate
  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    "apply-entity"
  );

  return newEditorState;
};

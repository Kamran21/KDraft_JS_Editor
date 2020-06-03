import { getDefaultKeyBinding, KeyBindingUtil } from "draft-js";

export const keyBindingFn=(event: any) =>{
  if (
    KeyBindingUtil.hasCommandModifier(event) &&
    event.shiftKey &&
    (event.key === "x" || event.key === "X")
  ) {
    return "strikethrough";
  }

  if (
    KeyBindingUtil.hasCommandModifier(event) &&
    event.shiftKey &&
    event.key === "7"
  ) {
    return "ordered-list";
  }

  if (
    KeyBindingUtil.hasCommandModifier(event) &&
    event.shiftKey &&
    event.key === "8"
  ) {
    return "unordered-list";
  }

  if (
    KeyBindingUtil.hasCommandModifier(event) &&
    event.shiftKey &&
    event.key === "9"
  ) {
    return "blockquote";
  }

  if (
    KeyBindingUtil.hasCommandModifier(event) &&
    event.shiftKey &&
    (event.key === "h" || event.key === "H")
  ) {
    return "highlight";
  }

  if (
    KeyBindingUtil.hasCommandModifier(event) &&
    event.shiftKey &&
    (event.key === "p" || event.key === "P")
  ) {
    return "paint";
  }

  return getDefaultKeyBinding(event);
}

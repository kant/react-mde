import * as React from "react";
import { Command } from "../types";
import { insertText, selectWordIfCaretIsInsideOne } from "../util/MarkdownUtil";
import {
  buildNewDraftState,
  getMarkdownStateFromDraftState,
} from "../util/DraftUtil";
import { MdeToolbarIcon } from "../components";

export const linkCommand: Command = {
  buttonContent: <MdeToolbarIcon icon="link" />,

  buttonProps: { "aria-label": "Insert a link" },

  execute: (state) => {
    const { text, selection } = getMarkdownStateFromDraftState(state);
    const newSelection = selectWordIfCaretIsInsideOne({ text, selection });
    const { newText, insertionLength } = insertText(
      text,
      "[",
      newSelection.start,
    );
    const finalText = insertText(
      newText,
      `](${text.slice(
        newSelection.start + insertionLength,
        newSelection.end + insertionLength,
      ) || "INSERT LINK PLACEHOLDER HERE"})`,
      newSelection.end + insertionLength,
    ).newText;

    return buildNewDraftState(state, {
      text: finalText,
      selection: {
        start: newSelection.start + insertionLength,
        end: newSelection.end + insertionLength,
      },
    });
  },
};

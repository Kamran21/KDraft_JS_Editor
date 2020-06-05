import React, { useState } from "react";
import clsx from "clsx";
import { EditorState, RichUtils } from "draft-js";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import PaletteIcon from "@material-ui/icons/Palette";
import { SketchPicker } from "react-color";

import { CustomStyleType, DispatchStyles } from "../data";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      minWidth: 45,
      height: 45,
      border: "1px solid #eee",
      backgroundColor: "#fff",
      borderRadius: 5,
      cursor: "pointer",
      marginRight: 2,
      marginBottom: 2,

      "&:active": {
        transform: "scale(.95)",
      },

      "&:hover": {
        backgroundColor: "#eee",
      },
    },
    activeButton: {
      backgroundColor: "turquoise",
      borderColor: "transparent",
    },
    buttonsGroup: {
      display: "flex",
      // justifyContent: "space-between",
      flexWrap: "wrap",
      padding: 5,
    },
  })
);

export interface Props {
  editorState: EditorState;
  value: string;
  style: string;
  dispatchStyle: DispatchStyles;
}

export const ColorPicker: React.FC<Props> = ({
  editorState,
  value,
  style,
  dispatchStyle,
}) => {
  const classes = useStyles();
  const [selectedColor, setSelectedColor] = useState("#000");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeComplete = (color: any) => {
    setSelectedColor(color.hex);
    dispatchStyle("PAINT", { color: color.hex }, true);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={clsx(
          classes.button,
          editorState.getCurrentInlineStyle().has(style) && classes.activeButton
        )}
      >
        <PaletteIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <SketchPicker
            color={selectedColor}
            onChangeComplete={handleChangeComplete}
          />
        </MenuItem>
      </Menu>
    </div>
  );
};

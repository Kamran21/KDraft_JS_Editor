import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PaletteIcon from "@material-ui/icons/Palette";
import { SketchPicker } from "react-color";
import { ChildrenType } from "../../globalTypes";
import { EditorState, RichUtils } from "draft-js";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";

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
        transform: "scale(.95)"
      },

      "&:hover": {
        backgroundColor: "#eee"
      }
    },
    activeButton: {
      backgroundColor: "turquoise",
      borderColor: "transparent"
    },
    buttonsGroup: {
      display: "flex",
      // justifyContent: "space-between",
      flexWrap: "wrap",
      padding: 5
    }
  })
);

export interface Props {
  editorState: EditorState;
  value: string;
  style: string;
}

export const colortPicker: React.FC<Props> = ({
  editorState,
  value,
  style
}) => {
  const classes = useStyles();
  const [selectedColor, setSelectedColor] = useState("#000");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeComplete = (color: any) => {
    setSelectedColor(color.hex);
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

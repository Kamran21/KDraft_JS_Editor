import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import PaletteIcon from "@material-ui/icons/Palette";

import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";

import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";

import CodeIcon from "@material-ui/icons/Code";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";

import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

interface Props {
  icon: string;
}

export const MenuBtnIconLookup: React.FC<Props> = ({ icon }) => {
  const classes = useStyles();

  const lookUpIcon = () => {
    switch (icon) {
      case "PaletteIcon":
        return <PaletteIcon className={classes.root} />;
      case "CodeIcon":
        return <CodeIcon className={classes.root} />;
      case "FormatListBulletedIcon":
        return <FormatListBulletedIcon className={classes.root} />;
      case "FormatListNumberedIcon":
        return <FormatListNumberedIcon className={classes.root} />;

      //text-align
      case "FormatAlignLeftIcon":
        return <FormatAlignLeftIcon className={classes.root} />;
      case "FormatAlignRightIcon":
        return <FormatAlignRightIcon className={classes.root} />;
      case "FormatAlignCenterIcon":
        return <FormatAlignCenterIcon className={classes.root} />;

      //font
      case "FormatBoldIcon":
        return <FormatBoldIcon className={classes.root} />;
      case "FormatItalicIcon":
        return <FormatItalicIcon className={classes.root} />;
      case "FormatUnderlinedIcon":
        return <FormatUnderlinedIcon className={classes.root} />;

      default:
        return <MenuIcon className={classes.root} />;
    }
  };

  return lookUpIcon();
};

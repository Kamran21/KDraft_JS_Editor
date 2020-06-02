import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import PaletteIcon from "@material-ui/icons/Palette";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {}
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
        return <PaletteIcon className={classes.root}/>;
      default:
        return <MenuIcon className={classes.root}/>;
    }
  };

  return lookUpIcon();
};

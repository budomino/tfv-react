import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Masonry from "react-masonry-css";

/////////////////////////////////////////
//  Styles
/////////////////////////////////////////

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 0, 0, 0),
  },
  paper: {
    marginBottom: theme.spacing(0),
  },
  masonryGrid: {
    display: "flex",
    marginLeft: theme.spacing(0),
    width: "336px",
  },
  masonryColumn: {
    paddingLeft: theme.spacing(0),
    backgroundClip: "padding-box",
  },
}));

/////////////////////////////////////////
//  PropTypes
/////////////////////////////////////////

const propTypes = {
  children: PropTypes.node,
};

/////////////////////////////////////////
//  Component
/////////////////////////////////////////

const BreakpointMasonry = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  const breakpointCols = {
    default: 2,
    [theme.breakpoints.values.xl]: 2,
    [theme.breakpoints.values.lg]: 2,
    [theme.breakpoints.values.md]: 2,
    [theme.breakpoints.values.sm]: 2,
    [theme.breakpoints.values.xs]: 2,
  };

  return (
    <Masonry
      breakpointCols={breakpointCols}
      className={classes.masonryGrid}
      columnClassName={classes.masonryColumn}
    >
      {children}
    </Masonry>
  );
};

BreakpointMasonry.propTypes = propTypes;

export default BreakpointMasonry;
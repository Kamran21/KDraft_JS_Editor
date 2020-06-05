export const styles = {
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
  }
};

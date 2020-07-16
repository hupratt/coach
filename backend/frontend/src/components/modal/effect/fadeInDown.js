export default {
  mask: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 10001,
    top: 0,
    left: 0,
    position: "absolute",
    filter: "blur(1px)",
  },
  maskHidden: {
    display: "none",
  },
  container: {},
  containerHidden: {},
  panel: {
    zIndex: 10002,
    position: "absolute",
    left: "0",
    right: "0",
    top: "25vh",
    bottom: "0",
    margin: "auto",
  },
  panelHidden: {
    opacity: 0,
    zIndex: -1,
  },
};

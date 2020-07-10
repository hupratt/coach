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
    position: "relative",
  },
  panelHidden: {
    opacity: 0,
    zIndex: -1,
  },
};

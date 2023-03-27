import { createUseStyles } from "react-jss";

export const useProfileStyles = createUseStyles({
  parent: {
    width: "100%",
    height: "100%",
    // background: "#333333",
    color: "white",
    display: "grid",
    gridTemplateRows: "350px 1fr",
    border: "2px solid yellow",
  },
  user: {
    width: "100%",
    border: "2px solid red",
    display: "flex",
  },
  left: { width: "50%", height: "350px", border: "2px solid white" },
  avatar: {
    boxShadow: "0 0 2px 1px rgba(0, 140, 186, 0.5)",
    borderRadius: "10px",
  },
  right: { width: "50%", height: "350px", border: "5px solid black" },
  tasks: {},
});

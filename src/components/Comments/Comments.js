import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { TextareaAutosize } from "@mui/material";
import { addDoc } from "firebase/firestore";
import { commentsRef } from "../../firebase";

function Comments({ setShowComments, userEmail }) {
  const [commentValue, setCommentValue] = useState("");

  const handleSend = () => {
    const comment = {
      commentValue,
      userEmail,
    };
    addDoc(commentsRef, comment);

    setShowComments(true);
  };

  const handleClose = () => {
    setShowComments(false);
  };

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Comment</DialogTitle>
        <DialogContent>
          <TextareaAutosize
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            aria-label="maximum height"
            placeholder="I suggest"
            style={{ width: 300, height: 80, resize: "none" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Comments;

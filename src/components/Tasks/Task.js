import { Button } from "@mui/material";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BUSINESS_MANAGMENT,
  FINANCE_MANAGEMENT,
  HOME,
  SOFTWARE_DEVELOPMENT,
  SYSTEM_ADMIN_ENGINEER,
} from "../../constants/auth";
import { tasksRef } from "../../firebase";
import { useTasksStyle } from "./Task.style";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Responses from "../Responses/Responses";

function Tasks() {
  const styles = useTasksStyle();
  const [allTasks, setAllTasks] = useState([]);
  const [category, setCategory] = useState("");
  const [taskFiltered, setTaskFiltered] = useState(null);
  const [showResponseDialog, setShowResponseDialog] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const tasks = [];
    async function getData() {
      const snapshot = await getDocs(tasksRef);
      snapshot.forEach((doc) => tasks.push({ ...doc.data(), id: doc.id }));
      setAllTasks(tasks);
    }
    getData();
  }, []);

  const onResponseClick = (email) => {
    setShowResponseDialog(true);
    setUserEmail(email);
  };

  return (
    <div>
      {!taskFiltered
        ? allTasks.map((task) => {
            return (
              <div key={task.id}>
                <p>name - {task.taskName}</p>
                <p>description - {task.taskDescription}</p>
                <button onClick={() => onResponseClick(task.email)}>
                  Response
                </button>
                <button>Comment</button>
              </div>
            );
          })
        : taskFiltered.map((task) => {
            return (
              <div key={task.id}>
                <p>name - {task.taskName}</p>
                <p>description - {task.taskDescription}</p>
                <button onClick={onResponseClick}>Response</button>
                <button>Comment</button>
              </div>
            );
          })}
      {showResponseDialog && (
        <Responses
          setShowResponseDialog={setShowResponseDialog}
          userEmail={userEmail}
        />
      )}

      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setTaskFiltered(
              allTasks.filter((task) => task.typeTask == e.target.value)
            );
          }}
        >
          <MenuItem value={SOFTWARE_DEVELOPMENT}>
            {SOFTWARE_DEVELOPMENT}
          </MenuItem>
          <MenuItem value={FINANCE_MANAGEMENT}>{FINANCE_MANAGEMENT}</MenuItem>
          <MenuItem value={BUSINESS_MANAGMENT}>{BUSINESS_MANAGMENT}</MenuItem>
          <MenuItem value={SYSTEM_ADMIN_ENGINEER}>
            {SYSTEM_ADMIN_ENGINEER}
          </MenuItem>
        </Select>
      </FormControl>
      <Button>
        <NavLink to={HOME} style={{ textDecoration: "none" }}>
          Back
        </NavLink>
      </Button>
    </div>
  );
}
export default Tasks;

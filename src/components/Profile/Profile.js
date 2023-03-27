import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, tasksRef, usersRef } from "../../firebase";
import { useAuth } from "../../context/Context";
import { getDocs } from "firebase/firestore";
import { HOME, SIGN_IN } from "../../constants/auth";
import AddTask from "../AddTask/Addtask";
import { AiFillAlert } from "react-icons/ai";

function Profile() {
  const [logedUser, setLogedUser] = useState(null);
  const [googleUser, setGoogleUser] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showAddTask, setShowAddTask] = useState(false);
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    setGoogleUser(user);
    const users = [];
    async function getData() {
      const snapshot = await getDocs(usersRef);
      snapshot.forEach((doc) => users.push({ ...doc.data(), id: doc.id }));
      const result = users.find((elem) => elem.email === user?.email);
      setLogedUser(result);
    }
    getData();
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const tasks = [];
    async function getData() {
      const snapshot = await getDocs(tasksRef);
      snapshot.forEach((doc) => tasks.push({ ...doc.data(), id: doc.id }));
      const result = tasks.filter((elem) => elem.email === user?.email);
      setUserTasks(result);
    }
    getData();
  }, [showAddTask]);

  const logOut = async () => {
    try {
      await logout();
      navigate(HOME);
    } catch (e) {
      console.log(e.message);
    }
  };

  const onAddTaskClick = () => {
    setShowAddTask(true);
  };

  {
    if (auth.currentUser) {
      return (
        <div>
          {/* <AiFillAlert /> */}
          <p>
            {logedUser?.name} {logedUser?.surname} {googleUser?.displayName}
          </p>
          <img
            src={logedUser?.photoURL || googleUser?.photoURL}
            style={{ width: "100px", height: "100px" }}
          />
          <Button onClick={logOut}>Sign Out</Button>
          <Button onClick={onAddTaskClick} variant="contained" color="success">
            Add task
          </Button>
          {showAddTask && <AddTask setShowAddTask={setShowAddTask} />}
          {userTasks.map((task) => {
            return (
              <div key={task.id}>
                <p>{task.taskName}</p>
                <p>{task.taskDescription}</p>
              </div>
            );
          })}
        </div>
      );
    }
    return <Navigate to={SIGN_IN} />;
  }
}
export default Profile;

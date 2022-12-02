import { useState, useEffect, useCallback } from "react";
import { addUser, getAllUsers } from "../src/api";
import AddUserForm from "./AddUserForm/AddUserForm";
import UsersTableNew from "./UsersTable/UsersTable";

import { Button, Container, Tooltip } from "@mui/material";
import { AiOutlineUserAdd } from "react-icons/ai";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getAllUsers().then((res) => setUsers(res));
  }, []);

  const hideForm = useCallback(() => {
    setShowForm(false);
  }, []);

  const addUserHandler = (userData: UserData) => {
    setLoading(true);
    addUser(userData).then(() => {
      getAllUsers().then((res) => setUsers(res));
      setShowForm(false);
      setLoading(false);
    });
  };

  return (
    <Container sx={{ padding: "20px" }}>
      <Tooltip enterDelay={500} leaveDelay={200} title="Add">
        <Button
          style={{ backgroundColor: "#6babc3", display: "flex" }}
          variant="contained"
          onClick={() => setShowForm((prev) => !prev)}
          sx={{ margin: "20px auto" }}
        >
          <AiOutlineUserAdd size={20} fill="white" />
          Add new user
        </Button>
      </Tooltip>
      <UsersTableNew users={users} loading={loading} />

      <AddUserForm
        hidden={!showForm}
        hide={hideForm}
        addUser={addUserHandler}
      />
    </Container>
  );
}

export default App;

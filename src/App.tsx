import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPositions, getUsers } from "./api";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { Title } from "./components/Title";
import { Users } from "./components/Users";
import { RootState } from "./store";
import { setPositions, setTotalUsers, setUsers } from "./usersSlice";

function App() {
  const { countOfVisibleUsers } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    getPositions().then((res) => dispatch(setPositions(res.positions)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUsers(countOfVisibleUsers).then((res) => {
      dispatch(setUsers(res.users));
      dispatch(setTotalUsers(res.total_users));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countOfVisibleUsers]);
  return (
    <>
      <Header />
      <Title />
      <div className="container">
        <Users />
        <Form />
      </div>
    </>
  );
}

export default App;

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import { setCountOfVisibleUsers } from "../usersSlice";
import { Button } from "./Button";
import { User } from "./User";

export const Users = () => {
  const dispatch = useDispatch();

  const { users, countOfVisibleUsers } = useSelector(
    (state: RootState) => state
  );

  return (
    <div className="block users" id="users">
      <h1 className="blockTitle">Working with GET request</h1>

      <div className="grid">
        {users.map((elem) => {
          return <User key={elem.id} user={elem} />;
        })}
      </div>

      <Button
        text="Show more"
        downloadUsers={() => {
          dispatch(setCountOfVisibleUsers(countOfVisibleUsers + 6));
        }}
      />
    </div>
  );
};

import React, { useState } from "react";
import { useUserUpdate } from "../hooks/user/useUserUpdate";

type Props = {};

const ProfilePage = (props: Props) => {
  const [firstName, setFirstName] = useState("");
  const { updateUser, loading, error } = useUserUpdate({
    onCompleted: () => {
      console.log("User updated with name ", firstName);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <div>
      <label>Update name: </label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="border border-gray-500"
      />
      <button
        onClick={() => {
          updateUser({ firstName });
        }}
        className="p-2 bg-slate-200 rounded"
      >Submit</button>
    </div>
  );
};

export default ProfilePage;

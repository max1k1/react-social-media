import React, { useEffect, useState } from "react";

const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);
  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);
  const activateEditMode = () => {
    if (props.authorizedUserId === props.userId) {
      setEditMode(true);
    }
  };
  const deavateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };
  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };
  return (
    <div>
      {!editMode && (
        <div>
          <span onClick={activateEditMode}>
            {props.status || "User has no status"}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deavateEditMode}
            value={status}
          />
        </div>
      )}
    </div>
  );
};
export default ProfileStatusWithHooks;

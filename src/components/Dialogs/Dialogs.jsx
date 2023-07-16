import React from "react";
import styles from "./Dialogs.module.css";
import MessageItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";
import DialogFrom from "./DialogFrom/DialogFrom";

const Dialogs = ({sendMessage, dialogsPage }) => {
  const addNewMessage = (values) => {
    sendMessage(values.newMessageText);
  };
  const messagesElements = dialogsPage.messagesData.map((message) => (
    <MessageItem message={message.message} />
  ));
  const dialogsElements = dialogsPage.dialogsData.map((dialog) => (
    <DialogItem id={dialog.id} userName={dialog.userName}></DialogItem>
  ));
  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>{dialogsElements}</div>
      <div className={styles.messageArea}>
        <div className={styles.messages}>{messagesElements}</div>
        <DialogFrom onSubmit={addNewMessage} />
      </div>
    </div>
  );
};

export default Dialogs;

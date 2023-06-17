import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/userPhoto.png"

const Users =(props)=>{
    let pagesCount = Math.ceil(props.totalUsersCount/props.pageSize);
    let pages =[];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    return<div>
      <div>
        {
          pages.map(p =>{
            return<span className={p===props.currentPage && styles.selectedPageNumber}
            onClick={(e)=>{props.onPageChanged(p)}}
            >{p}</span>
          })
        }
      </div>
  {props.usersDate.map(u => (
    <div key={u.userId} className={styles.users}>
      <span className={styles.user}>
        <div className={styles.firstArea}>
          <img
            className={styles.ava}
            src={u.photos.small?u.photos.small:userPhoto}
            alt="avatar"
          />
          <div>
            {u.followed ? 
              <button onClick={() => {props.unFollow(u.id)}}>Unfollow</button>
            : 
              <button onClick={()=> {props.follow(u.id)}}>Follow</button>
            }
          </div>
        </div>
        <div className={styles.secondArea}>
          <div className={styles.thirdArea}>
            <div className={styles.name}>{u.name}</div>
            <div className={styles.status}>{u.status}</div>
          </div>
          <div className={styles.livingPlace}>
            <div>{"`${u.livingPlace.country}`"}</div>
            <div>{"`${u.livingPlace.city}`"}</div>
          </div>
        </div>
      </span>
    </div>
      ))}
</div>
}
export default Users;

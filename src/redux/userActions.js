import {
  SET_USERS,
  SET_USER,
  DELETE_USER,
  ADD_USER,
  SET_LAST_USER,
  LOADING_DATA
} from "./types";
import database from "../firebase/firebase";

export const getUsers = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  database
    .ref("users")
    .once("value")
    .then(snapshot => {
      const users = [];

      snapshot.forEach(childSnaphot => {
        users.push({
          ...childSnaphot.val()
        });
      });

      dispatch({
        type: SET_USERS,
        payload: users
      });
    });
};

export const deleteUser = userId => dispatch => {
  database
    .ref(`users/${userId}`)
    .remove()
    .then(() => {
      dispatch({ type: DELETE_USER, payload: userId });
    });
};

export const addUser = newUser => dispatch => {
  database
    .ref(`users/${newUser.id}`)
    .set(newUser)
    .then(ref => {
      dispatch({
        type: ADD_USER,
        payload: newUser
      });
    });
};

export const editUser = user => dispatch => {
  database.ref(`users/${user.id}`).update(user);
};

export const getUser = userId => dispatch => {
  database
    .ref(`users/${userId}`)
    .once("value")
    .then(snapshot => {
      dispatch({
        type: SET_USER,
        payload: snapshot.val()
      })
    });
};

export const getLastUser = () => dispatch => {
  database
    .ref("users")
    .limitToLast(1)
    .on("child_added", snapshot => {
      dispatch({ type: SET_LAST_USER, payload: snapshot.val() });
    });
};

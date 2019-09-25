import React, { Component } from "react";
import { Link } from "react-router-dom";
import DeleteUser from "./DeleteUser";

// MUI
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

class UserItem extends Component {
  render() {
    const {
      id,
      name,
      username,
      email,
      address: { city }
    } = this.props.user;
    return (
      <TableRow key={name}>
        <TableCell component="th" scope="row">
          {id}
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{username}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{city}</TableCell>
        <TableCell>
          <Button
            to={`/edit/${id}`}
            component={Link}
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
        </TableCell>
        <TableCell>
          <DeleteUser userId={id} name={name} />
        </TableCell>
      </TableRow>
    );
  }
}

export default UserItem;

import React, { Component } from "react";

//Redux
import { connect } from "react-redux";
import { deleteUser } from "../redux/userActions";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

class DeleteUser extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteUser = () => {
    this.props.deleteUser(this.props.userId);
    this.setState({ open: false });
  };
  render() {
    return (
      <>
        <Button onClick={this.handleOpen} variant="contained" color="secondary">
          Delete
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to delete <strong>{this.props.name}</strong>?</DialogTitle>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.deleteUser}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default connect(
  null,
  { deleteUser }
)(DeleteUser);

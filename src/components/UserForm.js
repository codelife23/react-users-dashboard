import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { addUser, editUser, getLastUser, getUser } from "../redux/userActions";

// MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  inputField: {
    marginBottom: 14
  }
})

class UserForm extends Component {
  state = {
    id: "",
    name: "",
    username: "",
    email: "",
    city: "",
    errEmail: false,
    errEmailText: "",
    errors: {}
  };
  componentDidMount() {
    if (this.props.fromAddPage) {
      this.props.getLastUser();
    } else {
      const userId = this.props.match.params.userId;
      this.props.getUser(userId);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.fromAddPage) {
      if (Object.keys(nextProps.lastUser).length) {
        this.setState({ id: nextProps.lastUser.id + 1 });
      }
    } else {
      if (Object.keys(nextProps.user).length) {
        this.setState({
          id: nextProps.user.id,
          name: nextProps.user.name,
          username: nextProps.user.username,
          email: nextProps.user.email,
          city: nextProps.user.address.city
        });
      }
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = () => {
    const user = {
      id: this.state.id,
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      address: {
        city: this.state.city
      }
    };

    const errors = {};

    if (user.name === "") {
      errors.name = "Must not be empty";
    }
    if (user.username === "") {
      errors.username = "Must not be empty";
    }
    if (user.address.city === "") {
      errors.city = "Must not be empty";
    }

    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regexEmail.test(String(user.email).toLowerCase())) {
      errors.email = "Email is incorrect";
    }

    if (Object.keys(errors).length) {
      this.setState({
        errors
      })
      return
    }

    if (this.props.fromAddPage) this.props.addUser(user);
    else this.props.editUser(user);

    this.handleCancel();
  };
  handleCancel = () => {
    this.props.history.push("/");
  };
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <>
        <div className="form-wrap">
          <form>
            <TextField
              name="name"
              type="text"
              label="name"
              helperText={errors.name}
              error={errors.name ? true : false}
              value={this.state.name}
              onChange={this.handleChange}
              fullWidth
              className={classes.inputField}
            />
            <TextField
              name="username"
              type="text"
              label="User name"
              helperText={errors.username}
              error={errors.username ? true : false}
              value={this.state.username}
              onChange={this.handleChange}
              fullWidth
              className={classes.inputField}
            />
            <TextField
              name="email"
              type="email"
              label="Email"
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              className={classes.inputField}
            />
            <TextField
              name="city"
              type="text"
              label="City"
              helperText={errors.city}
              error={errors.city ? true : false}
              value={this.state.city}
              onChange={this.handleChange}
              fullWidth
              className={classes.inputField}
            />
          </form>

          <Grid container spacing={2} justify="flex-end">
            <Grid item>
              <Button
                onClick={this.handleCancel}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={this.handleSubmit}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  lastUser: state.data.lastUser,
  user: state.data.user
});

const mapActionsToProps = {
  addUser,
  editUser,
  getLastUser,
  getUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(withRouter(UserForm)));

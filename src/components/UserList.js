import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserItem from "./UserItem";

// Redax
import { connect } from "react-redux";
import { getUsers } from "../redux/userActions";

// MUI
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";

class UserList extends Component {
  state = {
    order: "",
    orderBy: "",
    sort: ""
  };
  componentDidMount() {
    this.props.getUsers();
  }
  desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };
  handleChange = event => {
    const orderBy = event.target.value.split(" ")[0];
    const order = event.target.value.split(" ")[1];
    this.setState({
      order,
      orderBy,
      sort: event.target.value
    });
  };
  render() {
    const { users, loading } = this.props.data;

    if (this.state.sort) {
      users.sort((a, b) =>
        this.state.order === "desc"
          ? this.desc(a, b, this.state.orderBy)
          : -this.desc(a, b, this.state.orderBy)
      );
    }

    return (
      <Paper style={{ padding: 16 }}>
        <Grid container spacing={2} justify="space-between">
          <Grid item>
            <FormControl style={{ width: 220 }}>
              <InputLabel htmlFor="sortBy">SortBy</InputLabel>
              <Select value={this.state.sort} onChange={this.handleChange}>
                <MenuItem value="username asc">Username A...Z</MenuItem>
                <MenuItem value="username desc">Username Z...A</MenuItem>
                <MenuItem value="id desc">Id higher first</MenuItem>
                <MenuItem value="id asc">Id lover first</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              to="/add"
              component={Link}
            >
              Add new
            </Button>
          </Grid>
        </Grid>

        <Paper style={{ width: "100%", overflowX: "auto", marginTop: 14 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <div style={{ textAlign: "center" }}>
                      <CircularProgress size={32} />
                    </div>
                  </TableCell>
                </TableRow>
              ) : Object.keys(users).length ? (
                users.map(user => <UserItem key={user.id} user={user} />)
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>
                    <div style={{ textAlign: "center", fontSize: 16 }}>
                      No users
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUsers }
)(UserList);

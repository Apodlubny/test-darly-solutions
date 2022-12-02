import React from "react";
import TableElement from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type Props = {
  users: User[];
  loading: boolean;
};

const UsersTable: React.FC<Props> = ({ users, loading }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <TableElement
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow style={{ backgroundColor: "#6babc3" }}>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& tr:nth-of-type(2n+1)": {
                backgroundColor: "grey.100",
              },
            }}
          >
            {users.map((user) => (
              <TableRow
                key={user.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.address}</TableCell>
                <TableCell align="center">{user.country}</TableCell>
              </TableRow>
            ))}
            {loading && (
              <TableRow>
                <TableCell component="th" scope="row">
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableElement>
      </TableContainer>
    </>
  );
};

export default UsersTable;

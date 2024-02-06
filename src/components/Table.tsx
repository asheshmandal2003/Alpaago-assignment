import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  CircularProgress,
  IconButton,
  Switch,
  Tooltip,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { ArrowBack, RefreshOutlined } from "@mui/icons-material";
import { FlexCenter } from "./FlexCenter";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";
import { ErrorAlert } from "./Alert";
import Filter from "./Filter";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#eeeeee",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
}));

type UserDetails = {
  readonly uid: string;
  readonly id: string;
  email: string;
  createdAt: string;
  status?: boolean;
};

interface User {
  users: Array<UserDetails> | null;
  setUsers: Dispatch<SetStateAction<Array<UserDetails> | null>>;
  getUsers(): void;
}

export default function UsersTable({ users, setUsers, getUsers }: User) {
  const phone = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const [change, setChange] = useState<string | null>(() => null);

  const updateStatus = async (docId: string, user: UserDetails) => {
    setChange(() => docId);
    await updateDoc(doc(db, "users", docId), { status: !user.status })
      .then(() => {
        setUsers((prevUsers): Array<UserDetails> | null =>
          prevUsers
            ? prevUsers.filter((prevUser) => prevUser.id !== docId)
            : null
        );
      })
      .catch(() => ErrorAlert("Something went wrong!"));
    setChange(() => null);
  };

  return (
    <>
      {users ? (
        <FlexCenter mt={5} flexDirection="column" alignItems="center">
          <Item sx={{ width: phone ? "90%" : "60%", mb: 3 }}>
            <Tooltip title="Home">
              <IconButton onClick={() => navigate("/")}>
                <ArrowBack />
              </IconButton>
            </Tooltip>
            <Box ml="auto">
              <Tooltip title="Refresh">
                <IconButton sx={{ mr: 2 }} onClick={getUsers}>
                  <RefreshOutlined />
                </IconButton>
              </Tooltip>
              <Filter users={users} setUsers={setUsers} />
            </Box>
          </Item>
          <TableContainer
            component={Paper}
            sx={{ width: phone ? "90%" : "60%", mb: 6 }}
          >
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Added</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.email}
                    </TableCell>
                    <TableCell align="right">
                      {moment(user.createdAt).format("D MMM")}
                    </TableCell>
                    <TableCell align="right">
                      <Typography color="#4caf50">Active</Typography>
                    </TableCell>

                    <TableCell align="right">
                      {change && change === user.id ? (
                        <CircularProgress size={30} />
                      ) : (
                        <Tooltip title="Set inactive">
                          <Switch
                            defaultChecked={user.status}
                            onChange={() => updateStatus(user.id, user)}
                          />
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </FlexCenter>
      ) : (
        <FlexCenter height="100vh" alignItems="center">
          <CircularProgress size={50} />
        </FlexCenter>
      )}
    </>
  );
}

import {
  Avatar,
  Button,
  Card,
  CircularProgress,
  Divider,
  Skeleton,
  Stack,
  Switch,
  Tooltip,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { FlexCenter } from "../components/FlexCenter";
import { deepOrange } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { ArrowBack, EditOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { ErrorAlert } from "../components/Alert";

const FlexBetween = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

function Profile() {
  const navigate = useNavigate();
  const email = useSelector((state: any) => state.auth.email);
  const userImg = useSelector((state: any) => state.auth.photoURL);
  const [userDetails, setUserDetails] = useState<any>(() => null);
  const [docId, setDocId] = useState<any>(() => null);
  const [change, setChange] = useState(() => false);
  const phone = useMediaQuery("(max-width:800px)");

  async function fetchUser() {
    const user = query(collection(db, "users"), where("email", "==", email));
    await getDocs(user)
      .then((res) => {
        if (res.empty) {
          console.log("No user found with the provided email.");
          return;
        } else {
          const userData = res.docs[0].data();
          setUserDetails(userData);
          setDocId(res.docs[0].id);
        }
      })
      .catch(() => ErrorAlert("Something went wrong!"));
  }
  useEffect(() => {
    fetchUser();
  }, []);

  const updateStatus = async () => {
    setChange(() => true);
    await updateDoc(doc(db, "users", docId), { status: !userDetails.status })
      .then(() => {
        setUserDetails((prevDetails: any) => {
          if (prevDetails) {
            return { ...prevDetails, status: !prevDetails.status };
          }
          return null;
        });
      })
      .catch(() => ErrorAlert("Something went wrong!"));
    setChange(() => false);
  };
  return (
    <FlexCenter mt={5}>
      <Card sx={{ width: phone ? "88%" : 450 }}>
        <FlexCenter bgcolor="#eeeeee" height={phone ? 120 : 100}>
          {userImg ? (
            <Avatar
              src={userImg}
              alt="userImg"
              sx={{
                bgcolor: deepOrange[500],
                position: "fixed",
                top: 90,
                height: 100,
                width: 100,
                fontSize: 30,
              }}
            />
          ) : (
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                position: "fixed",
                top: 90,
                height: 100,
                width: 100,
                fontSize: 30,
              }}
            >
              {email[0].toUpperCase()}
            </Avatar>
          )}
        </FlexCenter>
        <Stack spacing={2} p={4} mt={4}>
          <FlexBetween>
            <Typography>Name</Typography>
            {userDetails ? (
              <Typography>{userDetails.name}</Typography>
            ) : (
              <Skeleton width={50} animation="wave" />
            )}
          </FlexBetween>
          <Divider />
          <FlexBetween>
            <Typography>Email</Typography>
            <Typography>{email}</Typography>
          </FlexBetween>
          <Divider />
          <FlexBetween>
            <Typography>Status</Typography>
            {userDetails ? (
              change ? (
                <CircularProgress size={38} />
              ) : (
                <Tooltip title={userDetails.status ? "Active" : "Inactive"}>
                  <Switch
                    defaultChecked={userDetails.status}
                    onChange={updateStatus}
                  />
                </Tooltip>
              )
            ) : (
              <Skeleton width={30} animation="wave" />
            )}
          </FlexBetween>
          <Divider />
          <div style={{ display: "flex", gap: 10 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<ArrowBack />}
              color="inherit"
              onClick={() => navigate("/")}
            >
              Go Back
            </Button>
            <Button
              fullWidth
              variant="outlined"
              endIcon={<EditOutlined />}
              color="inherit"
            >
              Edit
            </Button>
          </div>
        </Stack>
      </Card>
    </FlexCenter>
  );
}

export default Profile;

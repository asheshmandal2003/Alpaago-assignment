import { useEffect, useState } from "react";
import UsersTable from "../components/Table";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { ErrorAlert } from "../components/Alert";

type UserDetails = {
  readonly uid: string;
  readonly id: string;
  email: string;
  createdAt: string;
  status?: boolean;
};

const ActiveUsers = () => {
  const [users, setUsers] = useState<Array<UserDetails> | null>(null);

  const fetchUsers = async () => {
    const res = query(collection(db, "users"), where("status", "==", true));
    await getDocs(res)
      .then((res) => {
        const filteredData: Array<any> = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(filteredData);
      })
      .catch(() => ErrorAlert("Something went wrong!"));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <UsersTable users={users} setUsers={setUsers} getUsers={fetchUsers} />
    </>
  );
};

export default ActiveUsers;

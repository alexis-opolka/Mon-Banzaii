import Link from "next/link";
import { useState, useEffect } from "react";
import { Spinner } from "../components";
import { Layout } from "../components/users";
import { userService } from "pages/services";
import { isUserAdmin } from "pages/components/account";
import { Text } from "@nextui-org/react";

// Functions
export default function Index() {
  const [users, setUsers] = useState(null);
  const [userAdminRight, setUserAdminRight] = useState(Boolean(userService.userValue.admin));

  useEffect(() => {
    userService.getAll().then(x => {
      console.log("USER !:", x);
      setUsers(x);
    });
  }, []);

  // We make sure the user has the rights to see this page,
  // otherwise just stop there
  // console.log("User Admin Status:", isUserAdmin(), Boolean(userService.userValue.admin), typeof Boolean(userService.userValue.admin));
  // if (Boolean(userService.userValue.admin)) {
  //   console.log("The user doesn't have the rights to be here!");
  //   return null
  // };

  function deleteUser(id){
    setUsers(users.map(x => {
      if (x.id === id) {
        x.isDeleting = true;
      }
      return x;
    }));

    userService.delete(id).then(() => {
      setUsers(users => users.filter(x => x.id !== id));
    });
  }

  return (
    <Layout>
      {console.log("USERS:", users, userAdminRight)}
      <Text color="$TitleColor">
        <h1>Users</h1>
      </Text>
      <Link href="/users/add" className="btn btn-sm btn-success mb-2">Add User</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: '20%' }}>First Name</th>
            <th style={{ width: '20%' }}>Last Name</th>
            <th style={{ width: '20%' }}>Username</th>
            <th style={{ width: '20%' }}>Email</th>
            <th style={{ width: '20%' }}>Admin rights</th>
            <th style={{ width: '10%' }}></th>
          </tr>
        </thead>
        <tbody>
          {userAdminRight && users && users.map(user =>
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.admin}</td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <Link href={`/users/edit/${user.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={user.isDeleting}>
                  {user.isDeleting
                    ? <span className="spinner-border spinner-border-sm"></span>
                    : <span>Delete</span>
                  }
                </button>
              </td>
            </tr>
          )}
          {userAdminRight && !users &&
            <tr>
              <td colSpan={4}>
                <Spinner />
              </td>
            </tr>
          }
          {userAdminRight && users && !users.length &&
            <tr>
              <td colSpan={4} className="text-center">
                <div className="p-2">No Users To Display</div>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </Layout>
  );
}


import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEdit } from 'pages/components/users';
import { Spinner } from 'pages/components';
import { userService, alertService } from 'pages/services';
import { Text } from '@nextui-org/react';

export default Edit;

function Edit() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    // fetch user and set default form values if in edit mode
    userService.getById(id)
      .then(x => setUser(x))
      .catch(alertService.error)
  }, [router]);

  return (
    <Layout>
      <Text color='$TitleColor'><h1>Edit User</h1></Text>
      {user ? <AddEdit user={user} /> : <Spinner />}
    </Layout>
  );
}

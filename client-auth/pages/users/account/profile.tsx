import { Layout } from "pages/components/users";
import { MinidenticonImg } from "pages/components/account";
import { userService } from "pages/services";

export default function Index(){

  const user = userService.userValue ? userService.userValue : null;

  return (
    <Layout>
      <div className="card">
        <div id="user-informations">
          <div id="user-information-picture">
            <MinidenticonImg username={user.username} saturation={50} lightness={50} height={150} width={150}/>
          </div>
        </div>
      </div>
    </Layout>
  )
}

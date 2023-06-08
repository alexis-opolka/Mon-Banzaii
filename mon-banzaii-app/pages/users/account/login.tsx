import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService, alertService } from '../../../services';
import { parse } from 'url';
import Layout, {YupFormInput, createRequiredMsg} from 'components/account';

export default function Login() {
  const router = useRouter();

  // form validation rules 
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(createRequiredMsg("Username")),
    password: Yup.string().required(createRequiredMsg("Password"))
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ username, password }) {
    alertService.clear();
    return userService.login(username, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query.returnUrl || '/';
        router.push(parse(returnUrl[0]));
      })
      .catch(alertService.error);
  }

  return (
    <Layout>
      <div className="card ">
        <h4 className="card-header">Login</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <YupFormInput inputName='Username' inputToRegister='username' registerFunction={register} inputType='username' errorsHolder={errors.username} />
            <YupFormInput inputName='Password' inputToRegister='password' registerFunction={register} inputType='password' errorsHolder={errors.password} />
            <button disabled={formState.isSubmitting} className="btn btn-primary">
              {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
              Login
            </button>&nbsp; or &nbsp;
            <Link href="/users/account/register">
              <button className="btn btn-primary">
                Register
              </button>
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
}

import { useRouter } from 'next/router';
import Link from 'next/link';
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { userService, alertService } from 'pages/services';
import Layout, { YupFormInput, createRequiredMsg } from 'pages/components/account';


// Functions
function Register() {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(createRequiredMsg("First Name")),
    lastName: Yup.string().required(createRequiredMsg("Last Name")),
    username: Yup.string().required(createRequiredMsg("Username")),
    email: Yup.string().required(createRequiredMsg("Email")),
    password: Yup.string().required(createRequiredMsg("Password"))
      .min(6, createRequiredMsg("Password", 6)),
    passwordVerification: Yup.string().required(createRequiredMsg("Password"))
      .min(6, createRequiredMsg("Password", 6))
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  const formOptions = {
    resolver: yupResolver(validationSchema)
  };

  // Let's initialize the functions used to build the form
  // with the useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const {errors} = formState;

  function onSubmit(user) {
    // On the submit stage
    // The user should have a successful registration

    return userService.register(user).then(() => {
      alertService.success("Registration successful"),
        // If that's the case, push the routing to the login page
        router.push('login')
    }) // Otherwise, catch our error
      .catch(alertService.error)
  }

  return (
    <Layout takesTheSpace={true}>
      <div className="card">
        <h4 className="card-header">Register</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <YupFormInput inputName='First Name' inputToRegister='firstName' registerFunction={register} inputType='text' errorsHolder={errors.firstName} />
            <YupFormInput inputName='Last Name' inputToRegister='lastName' registerFunction={register} inputType='text' errorsHolder={errors.lastName} />
            <YupFormInput inputName='Username' inputToRegister='username' registerFunction={register} inputType='username' errorsHolder={errors.username} />
            <YupFormInput inputName='Email' inputToRegister='email' registerFunction={register} inputType='email' errorsHolder={errors.email} />
            <YupFormInput inputName='Password' inputToRegister='password' registerFunction={register} inputType='password' errorsHolder={errors.password} />
            <YupFormInput inputName='Re-enter your Password' inputToRegister='passwordVerification' registerFunction={register} inputType='password' errorsHolder={errors.passwordVerification}/>
            <button disabled={formState.isSubmitting} className="btn btn-primary">
              {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
              Register
            </button>
            <Link href="/users/account/login" className="btn btn-link">Cancel</Link>
          </form>
        </div>
      </div>
    </Layout>
  )
}


// Variable declarations
export default Register;

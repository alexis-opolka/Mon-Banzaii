import { useRouter } from 'next/router';
import Link from 'next/link';
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { Layout } from 'pages/components/users';
import { userService, alertService } from 'pages/services';

// Functions
function Register() {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(createRequiredMsg("First Name")),
    lastName: Yup.string().required(createRequiredMsg("Last Name")),
    username: Yup.string().required(createRequiredMsg("Username")),
    password: Yup.string().required(createRequiredMsg("Password"))
      .min(6, createMinimumPasswordRequirementMsg(6))
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
    <Layout>
      <div className="card">
        <h4 className="card-header">Register</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.firstName?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.lastName?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.username?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <button disabled={formState.isSubmitting} className="btn btn-primary">
              {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
              Register
            </button>
            <Link href="/account/login" className="btn btn-link">Cancel</Link>
          </form>
        </div>
      </div>
    </Layout>
  )
}

function createRequiredMsg(requiredElement) {
  return requiredElement + "is required";
}
function createMinimumPasswordRequirementMsg(number) {
  return `Password must be at least ${number} characters`;
}

// Variable declarations
export default Register;

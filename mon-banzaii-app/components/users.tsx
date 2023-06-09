import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm, FieldError, MultipleFieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService, alertService } from '../services';
import { CreateCompatibleOutputReactNode } from './contentConverter';
import React from 'react';
import { Text, Switch } from '@nextui-org/react';
import { createRequiredMsg } from './account';

export { AddEdit };
export { Layout };

function AddEdit(props) {
  const user = props?.user;
  const router = useRouter();

  // form validation rules 
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First Name is required'),
    lastName: Yup.string()
      .required('Last Name is required'),
    username: Yup.string()
      .required('Username is required'),
    email: Yup.string().required(createRequiredMsg("email"))
      .email("Must be a valid email"),
    password: Yup.string()
      .transform(x => x === '' ? undefined : x)
      // password optional in edit mode
      .concat(user ? null : Yup.string().required('Password is required'))
      .min(6, 'Password must be at least 6 characters'),
    admin: Yup.string()
  });
  const oneResolver = yupResolver(validationSchema);
  console.log("Resolver:", oneResolver);

  const formOptions = {
    resolver: oneResolver,
    defaultValues: null,
  };

  // set default form values if in edit mode
  if (user) {
    formOptions.defaultValues = props.user;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(data) {
    alertService.clear();
    try {
      // create or update user based on user prop
      let message;
      if (user) {
        await userService.update(user.id, data);
        message = 'User updated';
      } else {
        await userService.register(data);
        message = 'User added';
      }

      // redirect to user list with success message
      router.push('/users');
      alertService.success(message, true);
    } catch (error) {
      alertService.error(error);
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="mb-3 col">
          <Text color='$TitleColor'>
            <label className="form-label">First Name</label>
          </Text>
          <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{CreateCompatibleOutputReactNode(errors.firstName?.message)}</div>
        </div>
        <div className="mb-3 col">
          <Text color='$TitleColor'>
            <label className="form-label">Last Name</label>
          </Text>
          <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{CreateCompatibleOutputReactNode(errors.lastName?.message)}</div>
        </div>
      </div>
      <div className="row">
        <div className="mb-3 col">
          <Text color='$TitleColor'>
            <label className="form-label">Username</label>
          </Text>
          <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{CreateCompatibleOutputReactNode(errors.username?.message)}</div>
        </div>
        <div className="mb-3 col">
          <Text color='$TitleColor'>
            <label className="form-label">Email</label>
          </Text>
          <input name="email" type="email" {...register('email')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{CreateCompatibleOutputReactNode(errors.email?.message)}</div>
        </div>
        <div className="mb-3 col">
          <Text color='$TitleColor'>
            <label className="form-label">
              Password
              {user && <em className="ms-1">(Leave blank to keep the same password)</em>}
            </label>
          </Text>
          <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">
            {CreateCompatibleOutputReactNode(errors.password)}
          </div>
        </div>
        <div className="mb-3">
          <Text color='$TitleColor'>Administrator Rights</Text>
          <div className='d-flex flex-row'>
            <input type="radio" name="admin" value={"true"} {...register('admin')} defaultChecked={!Boolean(validationSchema.fields.admin)} />
            <Text color='$TitleColor'>&nbsp; True</Text>
          </div>
          <div className='d-flex flex-row'>
            <input type="radio" name="admin" value={"false"} {...register('admin')} defaultChecked={!Boolean(validationSchema.fields.admin)} />
            <Text color='$TitleColor'>&nbsp; False</Text>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
          {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
          Save
        </button>
        <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
        <Link href="/users" className="btn btn-link">Cancel</Link>
      </div>
    </form>
  );
}

function Layout({ children }) {
  return (
    <div className="p-4">
      <div className="container">
        {children}
      </div>
    </div>
  );
}

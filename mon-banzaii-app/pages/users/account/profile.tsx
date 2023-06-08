import { Layout } from "components/users";
import { MinidenticonImg } from "components/account";
import { userService, alertService } from "services";
import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { YupFormInput, createRequiredMsg } from 'components/account';
import {useRouter} from "next/router";

export default function Index(){

  // If the user can access this page `userService.userValue` should be
  // set but we never can be sure, so we're going to check.
  const user = userService.userValue ? userService.userValue : undefined;
  var isTheFirstUser;
  var isNotAnAdmin;

  if (user?.id == 1){
    isTheFirstUser = true;
  } else {
    isTheFirstUser = false;
  }

  if (user?.admin == "false") {
    isNotAnAdmin = true;
  } else {
    isNotAnAdmin = false;
  }

  // If `user` is undefined, the userValue has not been set
  // We then return a null result
  if (user == undefined) return null;

  return (
    <Layout>
      <div id="" className="card mb-4">
        <div id="user-profile-header" className="card-header">Your Profile</div>
        <div id="user-profile" className="card-body justify-content-between">
          <div id="user-information" className="d-flex flex-row align-items-center align-self-center">
            <div id="user-information-left-content" className="d-flex flex-row align-items-center border-collapsed-flex me-auto">
              <div id="user-information-picture">
                <MinidenticonImg username={user.username} saturation={50} lightness={50} height={150} width={150} />
              </div>
            </div>
            <div className="d-flex flex-column text-center">
              <div id="user-information-name" className="fs-3">
                {user.firstName} {user.lastName}
              </div>
              <div id="user-information-right-content" className="d-flex flex-row text-start">
                <div id="user-information-right-content-title" className="d-flex flex-column" style={{ minWidth: "max-content" }}>
                  <UserInformation title="Your Email" />
                  <UserInformation title="Your Username" />
                </div>
                <div id="user-information-right-content-data" className="d-flex flex-column text-end" style={{ minWidth: "max-content" }}>
                  <UserInformation data={user.email} />
                  <UserInformation data={user.username} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-4">
        <div id="user-profile-actions-header" className="card-header">Your Actions</div>
        <div id="user-profile-actions" className="card-body">
          <div className="row">
            <UserInformationActionPassword />
            <UserInformationActionEmail />
          </div>
        </div>
      </div>
      <div id="user-profile-logout" className="d-flex flex-row-reverse align-self-end align-items-end">
        <button className="btn btn-outline-danger" onClick={userService.logout}>
          Logout
        </button>
        {isTheFirstUser && isNotAnAdmin && <button className="btn btn-outline-primary mr-3" onClick={BeAnAdmin}>Be Admin</button>}
      </div>
    </Layout>
  )
}

async function BeAnAdmin(){
  const user = userService.userValue ? userService.userValue : undefined;

  await userService.update(user.id, { username: user.username, admin: "true" })
    .then(() => {
      alertService.success("User's right successfully updated")
    })
    .catch((error) => {
      alertService.error(error);
    })
}

function UserInformation({title, data, ...props}: {title?: string, data?:any, props?: {}}){

  if (title) {
    return (
      <span className="fs-5 fw-bold me-1" {...props}>
        {title + ":"}
      </span>
    )
  } else if (data) {
    return (
      <span className="fs-5" {...props}>
        {data}
      </span>
    )
  }
}

function UserInformationActionPassword(){
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    password: Yup.string().required(createRequiredMsg("Password")).min(6, createRequiredMsg("Password", 6)),
    passwordVerification: Yup.string().required(createRequiredMsg("Password"))
      .min(6, createRequiredMsg("Password", 6)).oneOf([Yup.ref('password'), null], 'Passwords must match')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit({password}) {
    const user = userService.userValue;
    alertService.clear();
    await userService.update(user.id, {
      username: user.username,
      password: password
    })
    .then(() => {
      alertService.success("Password successfully updated");
    })
    .catch((error) => {
      alertService.error(error);
    })
  }

  return (
    <div className="col-sm-6 mb-3 mb-sm-0">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Change my Password</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <YupFormInput inputName='New Password' inputToRegister='password' registerFunction={register} inputType='password' errorsHolder={errors.password} />
            <YupFormInput inputName='Confirm New Password' inputToRegister='passwordVerification' registerFunction={register} inputType='password' errorsHolder={errors.passwordVerification} />
            <button disabled={formState.isSubmitting} className="btn btn-primary">
              {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function UserInformationActionEmail() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required(createRequiredMsg("Email")).email("Email must be a valid email address"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit({ email }) {
    const user = userService.userValue;
    alertService.clear();
    await userService.update(user.id, {
      username: user.username,
      email: email
    })
      .then(() => {
        alertService.success("Password successfully updated");
      })
      .catch((error) => {
        alertService.error(error);
      })
  }

  return (
    <div className="col-sm-6 mb-3 mb-sm-0">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Change my Email Address</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <YupFormInput inputName='New Email' inputToRegister='email' registerFunction={register} inputType='email' errorsHolder={errors.email} />
            <button disabled={formState.isSubmitting} className="btn btn-primary">
              {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

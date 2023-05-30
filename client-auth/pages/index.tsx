import Link from 'next/link';
import { userService } from './services';
import RedirectToSignIn from './components/buttonWidget';

export default function Home() {
  return(
    <div className='p-4'>
      <div className='container'>
        <h1>Hi {userService.userValue?.firstname}</h1>
        <p>You're logged in with Next.JS & JWT</p>
        <RedirectToSignIn />
      </div>
    </div>
  )
}

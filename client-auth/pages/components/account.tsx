import { useEffect,useMemo } from 'react';
import { useRouter } from 'next/router';
import { userService } from '../services';
import { HeaderLogo } from './logos';
import { minidenticon } from 'minidenticons';
import Image from 'next/image';
import { CreateCompatibleOutputReactNode } from './contentConverter';


export default function Layout({ children , takesTheSpace}: {children: any, takesTheSpace?: any}) {
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      router.push('/');
    }
  }, [router]);

  return (
    <main className='flex min-h-screen flex-col items-center'>
      <div className="w-full max-w-5xl justify-between font-mono lg:flex pt-4">
        <HeaderLogo />
      </div>

      <div className='space-y-4 rounded-xl p-4 bg-gray-200 dark:bg-gray-800'>
        {children}
      </div>
    </main>
  );
}

export function YupFormInput({
    inputName,
    inputToRegister,
    registerFunction,
    errorsHolder,
    inputType
  }: {
    inputName:string,
    inputToRegister: string,
    registerFunction: any,
    errorsHolder: any,
    inputType: string
  }): JSX.Element{
  return(
    <div className="mb-3">
      <label className="form-label">{inputName}</label>
      <input name={inputToRegister} type={inputType} {...registerFunction(inputToRegister)} className={`form-control ${errorsHolder ? 'is-invalid' : ''}`} />
      <div className="invalid-feedback">{CreateCompatibleOutputReactNode(errorsHolder)}</div>
    </div>
  )
}

// Variables declaration
export const MinidenticonImg = ({ username, saturation, lightness, ...props }) => {
  const svgURI = useMemo(
    () => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness]
  )
  return (
  <Image src={svgURI} alt={username} {...props} />
  )
}

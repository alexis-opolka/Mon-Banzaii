import Image from 'next/image';
import { ReactElement } from 'react';

export function headerLogo(): ReactElement {
  return (
    <a
     className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
     href="/"
     target="_blank"
     rel="noopener noreferrer"
    >
                
      <Image
        src="/logo.png"
        alt="Banzaii project logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
    </a>
  )
}

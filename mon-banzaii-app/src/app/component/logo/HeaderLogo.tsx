import Image from 'next/image';

import { ReactElement } from 'react';

export function HeaderLogo(): ReactElement {
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
        width={135.72}
        height={135.2}
        priority
      />
    </a>
  )
}

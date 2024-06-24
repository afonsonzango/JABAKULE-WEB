'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';

interface NavLinkProps {
  href: string
  children: ReactNode
  className?: string
  activeClassName?: string
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className, activeClassName }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`${className} ${isActive ? activeClassName : ''}`}>
        {children}
    </Link>
  )
}

export default NavLink;
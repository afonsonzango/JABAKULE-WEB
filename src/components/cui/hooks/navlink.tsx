'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';

interface NavLinkProps {
  href: string
  children: ReactNode
  className?: string
  activeClassName?: string,
  onClick?: () => void; 
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className, activeClassName, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`${className} ${isActive ? activeClassName : ''}`} onClick={onClick}>
        {children}
    </Link>
  )
}

export default NavLink;
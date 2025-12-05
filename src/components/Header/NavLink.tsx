import { Link } from 'react-router-dom';
import { css, cx } from '@styled-system/css';

const navLinkStyle = css({
  display: 'block',
  width: 'full',
  textDecoration: 'none',
  fontFamily: 'mono',
  fontSize: '20',
  lineHeight: 'default',
  color: 'text.subtlest',
  px: '24',
  py: '12',
  bg: 'surface.raised',
  borderStyle: 'solid',
  borderWidth: '0',
  borderLeftWidth: '4',
  borderColor: 'transparent',
  transitionDuration: 'fast',
  transitionProperty: 'colors',
  transitionTimingFunction: 'default',
  cursor: 'pointer',
  _hover: {
    color: 'text',
    bg: 'surface.raised.hovered',
  },
  _selected: {
    color: 'text',
    fontWeight: 'bold',
    bg: 'surface.raised.pressed',
    borderColor: 'yellow.60',
    _hover: {
      bg: 'surface.raised.pressed',
      cursor: 'default',
    },
  },
  xs: {
    px: '16',
  },
  md: {
    fontSize: '16',
    width: 'fit',
    bg: 'transparent',
    lineHeight: 'tight',
    px: '0',
    pt: '0',
    pb: '2',
    borderLeftWidth: '0',
    borderBottomWidth: '2',
    _hover: {
      bg: 'transparent',
    },
    _selected: {
      bg: 'transparent',
      borderColor: 'yellow.60',
      _hover: {
        bg: 'transparent',
      },
    },
  },
});

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
  setMobileMenuOpen: (open: boolean) => void;
};

export function NavLink({
  to,
  children,
  isActive,
  className,
  setMobileMenuOpen,
}: NavLinkProps) {
  return (
    <Link
      to={to}
      onClick={() => setMobileMenuOpen(false)}
      className={cx(navLinkStyle, className)}
      {...(isActive ? { 'data-selected': true } : {})}
    >
      {children}
    </Link>
  );
}

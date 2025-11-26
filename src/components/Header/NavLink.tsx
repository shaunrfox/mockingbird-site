import { Link } from 'react-router-dom';
import { css, cx } from '@styled-system/css';

const navLinkStyle = css({
  display: 'block',
  width: 'full',
  textDecoration: 'none',
  fontFamily: 'mono',
  fontSize: '16',
  lineHeight: 'default',
  color: 'text.subtlest',
  px: '16',
  py: '10',
  bg: 'bg.input',
  borderStyle: 'solid',
  borderWidth: '0',
  borderLeftWidth: '4',
  borderColor: 'transparent',
  transitionDuration: 'fast',
  // transitionProperty: 'color',
  transitionTimingFunction: 'default',
  cursor: 'pointer',
  _hover: {
    color: 'text',
    bg: 'bg.input.hovered',
  },
  _selected: {
    color: 'text',
    fontWeight: 'bold',
    bg: 'bg.input.hovered',
    borderColor: 'yellow.60',
  },
  md: {
    width: 'fit',
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

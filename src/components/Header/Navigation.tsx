import { Box, Button, IconButton } from '@okshaun/components';
import { css, cx } from '@styled-system/css';
import { Logo } from '../Logo';
import { NavLink } from './NavLink';
import { useLocation } from 'react-router-dom';

type NavigationProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

// Home is reached by the logo, so it is not repeated here.
const navigationItems = [
  { path: '/programs', label: 'Programs' },
  { path: '/events', label: 'Events' },
  { path: '/artists', label: 'Artists' },
  { path: '/news', label: 'News' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

// Donate sits apart from the list: it is the one call to action, and it is
// styled as a button rather than a link so it reads that way at a glance.
const donateStyle = css({
  textDecoration: 'none',
  width: 'full',
  textAlign: 'center',
  md: {
    width: 'fit',
  },
});

const navStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  width: '0',
  height: '0',
  position: 'fixed',
  top: '0',
  right: '0',
  bg: 'transparent',
  zIndex: '1000',
  transition: ['background', 'colors', 'size'],
  overflow: 'hidden',
  '&.mobile-menu-open': {
    width: 'full',
    height: 'full',
    bg: 'surface.raised',
    boxShadow: 'elevated',
    transition: ['background', 'colors', 'size'],
  },
  xs: {
    position: 'absolute',
    top: '8',
    right: '32',
    width: '0',
    height: '0',
    rounded: '4',
    overflow: 'hidden',
    '&.mobile-menu-open': {
      width: '2xs',
      height: 'fit',
    },
  },
  sm: {
    right: '48',
  },
  md: {
    position: 'relative',
    top: '0',
    right: '0',
    width: 'fit',
    height: 'fit',
    bg: 'transparent',
    boxShadow: 'zero',
    flexDirection: 'row',
    gap: '32',
    overflow: 'visible',
  },
});

const navHeader = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: 'full',
  px: '24',
  py: '4',
  '& > svg': {
    height: '32',
    my: '4',
  },
  xs: {
    px: '0',
    py: '0',
    '& > svg': {
      mx: '16',
    },
  },
  md: {
    display: 'none',
  },
});

export function Navigation({
  mobileMenuOpen,
  setMobileMenuOpen,
}: NavigationProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      as='nav'
      className={cx(navStyle, mobileMenuOpen && 'mobile-menu-open')}
    >
      <Box className={navHeader}>
        <Logo variant='mkbd-sm-bird' height='32' color='bg.neutral.pressed' />
        <IconButton
          iconName='x'
          appearance='subtle'
          altText='Close menu'
          size='lg'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label='Close menu'
          aria-expanded={mobileMenuOpen}
        />
      </Box>

      {navigationItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          isActive={isActive(item.path)}
          className={cx(mobileMenuOpen && 'mobile-menu-open')}
          setMobileMenuOpen={setMobileMenuOpen}
        >
          {item.label}
        </NavLink>
      ))}

      <Button
        href='/donate'
        variant='primary'
        onClick={() => setMobileMenuOpen(false)}
        className={donateStyle}
      >
        Donate
      </Button>
    </Box>
  );
}

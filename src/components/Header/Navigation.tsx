import { useLocation } from 'react-router-dom';
import { Box, IconButton } from '@okshaun/components';
import { NavLink } from './NavLink';
import { css, cx } from '@styled-system/css';

type NavigationProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

const navigationItems = [
  { path: '/', label: 'Home' },
  { path: '/team', label: 'Team' },
  // { path: '/pledge', label: 'Pledge' },
  { path: '/contact', label: 'Contact' },
];

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
  zIndex: '100',
  transitionDuration: 'slow',
  transitionProperty: ['background', 'colors', 'size'],
  transitionTimingFunction: 'default',
  overflow: 'hidden',
  '&.mobile-menu-open': {
    width: 'full',
    height: 'full',
    bg: 'surface.raised',
    boxShadow: 'medium',
    transitionDuration: 'slow',
    transitionProperty: ['background', 'colors', 'size'],
    transitionTimingFunction: 'default',
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
    boxShadow: 'none',
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
        <Box as='svg' viewBox='0 0 39 32' color='bg.neutral.pressed'>
          <use href='#mkbd-sm-bird' />
        </Box>
        <IconButton
          iconName='x'
          appearance='subtle'
          size='large'
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
    </Box>
  );
}

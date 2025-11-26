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
  { path: '/staff', label: 'Staff' },
  { path: '/pledge', label: 'Pledge' },
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
  zIndex: '100',
  transition: 'all 0.3s ease-in-out',
  overflow: 'hidden',
  '&.mobile-menu-open': {
    width: 'full',
    height: 'full',
    bg: 'surface',
    boxShadow: 'medium',
    transition: 'all 0.3s ease-in-out',
  },
  xs: {
    position: 'absolute',
    top: '8',
    right: '24',
    width: '0',
    height: '0',
    rounded: '4',
    overflow: 'hidden',
    '&.mobile-menu-open': {
      width: '2xs',
      height: 'fit',
    },
  },
  md: {
    position: 'relative',
    top: '0',
    right: '0',
    width: 'fit',
    height: 'fit',
    bg: 'surface',
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
  '& > svg': {
    height: '32',
    my: '4',
    mx: '16',
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

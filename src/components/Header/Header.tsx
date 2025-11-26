import { useState } from 'react';
import {
  Box,
  IconButton,
  useMediaQuery,
  type BoxProps,
} from '@okshaun/components';
import { css } from '@styled-system/css';
import { Logo } from './Logo';
import { SiteWrapper } from '../SiteWrapper';
import { Navigation } from './Navigation';

const headerStyle = css({
  backgroundColor: 'neutral.0/95',
  width: 'full',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'sticky',
  top: '0',
  zIndex: 10,
});

// const navWrapperBase = css({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   width: 'full',
//   maxWidth: '1152px',
//   minHeight: '56',
//   paddingX: '24px',
//   paddingY: '8px',
//   lg: {
//     display: 'none',
//   },
// });

// const desktopWrapperStyle = css({
//   display: 'none',
//   lg: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '32px',
//     alignItems: 'center',
//     width: '100%',
//     maxWidth: '1152px',
//     paddingX: '48px',
//     paddingY: '24px',
//   },
// });

// const mobileMenuStyle = css({
//   display: 'flex',
//   md: {
//     display: 'none',
//   },
// });

// const tabletNavStyle = css({
//   display: 'none',
//   md: {
//     display: 'flex',
//     gap: '32px',
//     alignItems: 'center',
//   },
//   lg: {
//     display: 'none',
//   },
// });

// const mobileMenuDrawer = css({
//   width: 'full',
//   backgroundColor: 'surface',
//   paddingY: '16',
//   paddingX: '24',
//   borderTop: '1px solid',
//   borderColor: 'border',
// });

type HeaderProps = BoxProps & {
  // children: React.ReactNode;
};

export function Header({ ...props }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMd = useMediaQuery('md', 'max');
  // const isLg = useMediaQuery("lg");
  // const isXl = useMediaQuery("xl");

  return (
    <Box as='header' className={headerStyle} {...props}>
      <SiteWrapper
        flexDir={{ base: 'row', lg: 'column' }}
        gap='32'
        py={{ base: '8', lg: '24' }}
      >
        <Logo />
        {isMd && (
          <IconButton
            iconName='menu'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label='Toggle menu'
            aria-expanded={mobileMenuOpen}
          />
        )}
        <Navigation
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* {isMd && !isLg ? (
          <Box className={mobileMenuStyle} />
        ) : (
          <HStack as='nav' gap='32' alignItems='center'>
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                isActive={isActive(item.path)}
              >
                {item.label}
              </NavLink>
            ))}
          </HStack>
        )} */}
      </SiteWrapper>

      {/* <Box as='nav' className={tabletNavStyle}>
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            isActive={isActive(item.path)}
          >
            {item.label}
          </NavLink>
        ))}
      </Box> */}

      {/* Mobile Menu Drawer
      {mobileMenuOpen && (
        <VStack className={mobileMenuDrawer} gap='16' alignItems='stretch'>
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              isActive={isActive(item.path)}
            >
              {item.label}
            </NavLink>
          ))}
        </VStack>
      )} */}
    </Box>
  );
}

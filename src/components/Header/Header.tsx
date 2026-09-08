import { useState } from 'react';
import {
  Box,
  IconButton,
  splitProps,
  type BoxProps,
} from '@okshaun/components';
import { css, cx } from '@styled-system/css';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { SiteWrapper } from '../SiteWrapper';
import { Navigation } from './Navigation';

const headerStyle = css({
  backgroundColor: { base: 'surface/95', lg: 'surface' },
  width: 'full',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'sticky',
  top: '0',
  zIndex: '10',
});

type HeaderProps = BoxProps & {
  // children: React.ReactNode;
};

const logoLinkStyles = css({
  cursor: 'pointer',
  _hover: {
    animation: '[squiggle 0.3s infinite]',
  },
});

export function Header({ ...props }: HeaderProps) {
  const [className, otherProps] = splitProps(props);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Box as='header' className={cx(headerStyle, className)} {...otherProps}>
      <SiteWrapper
        flexDir='row'
        gap='32'
        pb='8'
        pt='8'
      >
        <Link to='/' className={logoLinkStyles}>
          <Logo
            variant={{ base: 'mkbd-arts-logotype', sm: 'mockingbird-arts-logotype' }}
            height='32'
          />
        </Link>
        <IconButton
          iconName='menu'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          altText='Toggle menu'
          aria-label='Toggle menu'
          aria-expanded={mobileMenuOpen}
          display={{ base: 'flex', md: 'none' }}
        />
        <Navigation
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </SiteWrapper>
    </Box>
  );
}

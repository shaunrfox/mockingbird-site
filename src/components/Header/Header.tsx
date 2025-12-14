import { useState } from 'react';
import {
  Box,
  IconButton,
  useMediaQuery,
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
  position: { base: 'sticky', lg: 'relative' },
  top: '0',
  zIndex: 10,
});

type HeaderProps = BoxProps & {
  // children: React.ReactNode;
};

const logoLinkStyles = css({
  cursor: 'pointer',
  _hover: {
    animation: 'squiggle 0.3s infinite',
  },
});

export function Header({ ...props }: HeaderProps) {
  const [className, otherProps] = splitProps(props);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMd = useMediaQuery('md', 'max');
  const isSm = useMediaQuery('sm');
  const isLg = useMediaQuery('lg');

  const renderLogo = () => {
    if (isLg) {
      return <Logo variant='mockingbird-logo' height={160} />;
    }
    if (isSm) {
      return <Logo variant='mockingbird-arts-logotype' height={32} />;
    }
    return <Logo variant='mkbd-arts-logotype' height={32} />;
  };

  return (
    <Box as='header' className={cx(headerStyle, className)} {...otherProps}>
      <SiteWrapper
        flexDir={{ base: 'row', lg: 'column' }}
        gap='32'
        pb='8'
        pt={{ base: '8', lg: '64' }}
      >
        <Link to='/' className={logoLinkStyles}>
          {renderLogo()}
        </Link>
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
      </SiteWrapper>
    </Box>
  );
}

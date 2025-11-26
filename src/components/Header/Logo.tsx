import { Box } from '@styled-system/jsx';
import { cx, css } from '@styled-system/css';
import { useMediaQuery } from '@okshaun/components';

// Logo configuration for different breakpoints
const LOGO_CONFIGS = {
  base: {
    id: 'mkbd-arts-logotype',
    viewBox: '0 0 112 32',
    height: '32',
  },
  sm: {
    id: 'mockingbird-arts-logotype',
    viewBox: '0 0 194 32',
    height: '32',
  },
  lg: {
    id: 'mockingbird-logo',
    viewBox: '0 0 165 106',
    height: '160',
  },
} as const;

const logoStyles = css({
  width: 'auto',
  color: 'gray.90',
  _hover: {
    color: 'brand.60',
    animation: 'squiggle 0.3s infinite',
  },
});

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const isSm = useMediaQuery('sm');
  const isLg = useMediaQuery('lg');

  // Determine which logo config to use based on breakpoints
  const logoConfig = isLg
    ? LOGO_CONFIGS.lg
    : isSm
      ? LOGO_CONFIGS.sm
      : LOGO_CONFIGS.base;

  return (
    <Box
      as='a'
      href='/'
      className={cx(logoStyles, className)}
      height={logoConfig.height}
    >
      <svg
        height='100%'
        viewBox={logoConfig.viewBox}
        aria-label='Mockingbird Arts'
      >
        <use href={`#${logoConfig.id}`} />
      </svg>
    </Box>
  );
}

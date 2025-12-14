import { css } from '@styled-system/css';
import { Box, type BoxProps } from '@okshaun/components';

const LOGO_CONFIGS = {
  'mockingbird-logo': {
    viewBox: '0 0 165 106',
    width: 165,
    height: 106,
  },
  'mkbd-arts-logotype': {
    viewBox: '0 0 112 32',
    width: 112,
    height: 32,
  },
  'mkbd-sm-bird': {
    viewBox: '0 0 39 32',
    width: 39,
    height: 32,
  },
  'mkbd-arts-logo': {
    viewBox: '0 0 126 83',
    width: 126,
    height: 83,
  },
  'mkbd-arts-logo-2': {
    viewBox: '0 0 155 32',
    width: 155,
    height: 32,
  },
  'mockingbird-arts-logotype': {
    viewBox: '0 0 194 32',
    width: 194,
    height: 32,
  },
  'mkbd-logo': {
    viewBox: '0 0 71 58',
    width: 71,
    height: 58,
  },
  'mkbd-logo-2': {
    viewBox: '0 0 104 32',
    width: 104,
    height: 32,
  },
  'mockingbird-logo-badge': {
    viewBox: '0 0 186 126',
    width: 186,
    height: 126,
  },
} as const;

export type LogoVariant = keyof typeof LOGO_CONFIGS;

const logoStyles = css({
  color: 'icon',
});

type LogoProps = BoxProps & {
  variant?: LogoVariant;
};

export function Logo({ variant = 'mockingbird-logo', ...props }: LogoProps) {
  const config = LOGO_CONFIGS[variant];

  return (
    <Box
      as='svg'
      className={logoStyles}
      viewBox={config.viewBox}
      // width={config.width}
      // height={config.height}
      aria-label='Mockingbird Arts'
      {...props}
    >
      <use href={`#${variant}`} />
    </Box>
  );
}

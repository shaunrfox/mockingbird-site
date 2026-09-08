import { Box, splitProps, type BoxProps } from '@okshaun/components';
import { cx } from '@styled-system/css';
import { logo, type LogoVariantProps } from '@styled-system/recipes';
import { LOGO_NAMES, type LogoName } from '../../recipes/logo';

type LogoOwnProps = {
  /**
   * Which lockup to render. Responsive/conditional values are supported, e.g.
   * `{ base: 'mkbd-arts-logotype', sm: 'mockingbird-arts-logotype' }`.
   */
  variant?: LogoVariantProps['variant'];
  /** Accessible name. Pass `''` to mark the logo decorative. */
  altText?: string;
};

export type LogoProps = Omit<BoxProps, keyof LogoVariantProps | keyof LogoOwnProps> &
  Omit<LogoVariantProps, keyof LogoOwnProps> &
  LogoOwnProps;

/** Every lockup named by a (possibly conditional) variant value. */
function usedNames(variant: LogoVariantProps['variant']): LogoName[] {
  if (typeof variant === 'string') return [variant];
  if (!variant) return [];
  const names = Object.values(variant).filter(Boolean) as LogoName[];
  return LOGO_NAMES.filter((name) => names.includes(name));
}

export function Logo({
  variant = 'mockingbird-logo',
  altText = 'Mockingbird Arts',
  ...rest
}: LogoProps) {
  const [className, otherProps] = splitProps(rest);

  return (
    <Box
      as='svg'
      xmlns='http://www.w3.org/2000/svg'
      className={cx(logo({ variant }), className)}
      role='img'
      aria-label={altText || undefined}
      aria-hidden={altText ? undefined : true}
      {...otherProps}
    >
      {usedNames(variant).map((name) => (
        <use key={name} data-logo={name} href={`#${name}`} />
      ))}
    </Box>
  );
}

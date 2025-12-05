import { Box, type BoxProps, splitProps } from '@okshaun/components';
import { css, cx } from '@styled-system/css';

type SiteWrapperProps = BoxProps & {
  children: React.ReactNode;
};

const siteWrapperStyles = css({
  '@layer recipes': {
    position: 'relative',
    display: 'flex',
    flexDir: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    w: 'full',
    maxWidth: '5xl',
    px: '24',
    mx: 'auto',
    xs: {
      px: '32',
    },
    sm: {
      px: '48',
    },
  },
});

export function SiteWrapper({ children, ...props }: SiteWrapperProps) {
  const [className, otherProps] = splitProps(props);
  return (
    <Box className={cx(siteWrapperStyles, className)} {...otherProps}>
      {children}
    </Box>
  );
}

import {
  Box,
  splitProps,
  Divider,
  Text,
  type BoxProps,
} from '@okshaun/components';
import { css, cx } from '@styled-system/css';
import { SiteWrapper } from './SiteWrapper';
import { NewsletterForm } from './forms';

type FooterProps = BoxProps & {};

const footerStyle = css({
  py: '64',
  gap: '56',
});

export function Footer({ ...props }: FooterProps) {
  const [className, otherProps] = splitProps(props);

  return (
    <SiteWrapper className={cx(footerStyle, className)} {...otherProps}>
      <Divider w='full' maxWidth='lg' />
      <Box as='svg' viewBox='0 0 39 32' color='bg.neutral.bold' width='40'>
        <use href='#mkbd-sm-bird' />
      </Box>
      <Box>
        <NewsletterForm />
      </Box>
    </SiteWrapper>
  );
}

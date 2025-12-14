import {
  splitProps,
  Divider,
  type BoxProps,
  ThemeSwitcher,
} from '@okshaun/components';
import { css, cx } from '@styled-system/css';
import { Flex } from '@styled-system/jsx';
import { SiteWrapper } from './SiteWrapper';
import { Logo } from './Logo';
import { NewsletterForm } from './forms';

type FooterProps = BoxProps & {};

const footerStyle = css({
  py: '64',
  gap: '56',
  maxW: '3xl',
});

export function Footer({ ...props }: FooterProps) {
  const [className, otherProps] = splitProps(props);

  return (
    <SiteWrapper className={cx(footerStyle, className)} {...otherProps}>
      <Divider w='full' maxWidth='lg' />
      <Flex
        flexDir={{ base: 'column-reverse', md: 'row' }}
        w='full'
        gap='56'
        alignItems={{ base: 'center', md: 'end' }}
        justifyContent='space-between'
      >
        <NewsletterForm />
        <Flex flexDir='column' alignItems='center'>
          <ThemeSwitcher />
          <Logo variant='mkbd-sm-bird' width='40' color='bg.neutral.bold' />
        </Flex>
      </Flex>
    </SiteWrapper>
  );
}

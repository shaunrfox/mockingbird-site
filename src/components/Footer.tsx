import { useEffect } from 'react';
import {
  Box,
  splitProps,
  Divider,
  Text,
  type BoxProps,
} from '@okshaun/components';
import { css, cx } from '@styled-system/css';
import { SiteWrapper } from './SiteWrapper';

type FooterProps = BoxProps & {};

const footerStyle = css({
  py: '64',
  gap: '56',
});

export function Footer({ ...props }: FooterProps) {
  const [className, otherProps] = splitProps(props);

  useEffect(() => {
    const loadTally = () => {
      if (typeof window !== 'undefined') {
        const Tally = (
          window as Window & { Tally?: { loadEmbeds: () => void } }
        ).Tally;
        if (Tally) {
          Tally.loadEmbeds();
        } else {
          document
            .querySelectorAll<HTMLIFrameElement>(
              'iframe[data-tally-src]:not([src])'
            )
            .forEach((iframe) => {
              if (iframe.dataset.tallySrc) {
                iframe.src = iframe.dataset.tallySrc;
              }
            });
        }
      }
    };

    const scriptUrl = 'https://tally.so/widgets/embed.js';

    if (typeof window !== 'undefined') {
      const Tally = (window as Window & { Tally?: { loadEmbeds: () => void } })
        .Tally;
      if (Tally) {
        loadTally();
      } else if (
        document.querySelector(`script[src="${scriptUrl}"]`) === null
      ) {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.onload = loadTally;
        script.onerror = loadTally;
        document.body.appendChild(script);
      }
    }
  }, []);

  return (
    <SiteWrapper className={cx(footerStyle, className)} {...otherProps}>
      <Divider w='full' maxWidth='lg' />
      <Box as='svg' viewBox='0 0 39 32' color='bg.neutral.bold' width='40'>
        <use href='#mkbd-sm-bird' />
      </Box>
      <Box maxWidth='sm'>
        <Text textStyle='mono.lg'>Newsletter sign-up</Text>
        <iframe
          data-tally-src='https://tally.so/embed/2Ejl2b?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1'
          loading='lazy'
          width='100%'
          height='168'
          frameborder='0'
          marginheight='0'
          marginwidth='0'
          title='Newsletter sign-up'
        ></iframe>
      </Box>
    </SiteWrapper>
  );
}

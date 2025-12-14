import { Text, Heading, Button } from '@okshaun/components';
import { Link } from 'react-router-dom';
import { Flex } from '@styled-system/jsx';
import { SiteWrapper } from '../../components/SiteWrapper';
import { Logo } from '../../components/Logo';
import confetti from 'canvas-confetti';

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

function fireConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };

  const fire = (particleRatio: number, opts: confetti.Options) => {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  };

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

export default function NewsletterAlreadyConfirmed() {
  return (
    <SiteWrapper
      py='64'
      gap='40'
      alignItems='center'
      justifyContent='center'
      maxWidth='xl'
      height='100vh'
      width='100vw'
    >
      <Logo
        variant='mockingbird-arts-logotype'
        width='300'
        color='bg.neutral.bold'
      />
      <Flex
        flexDir='column'
        gap='16'
        alignItems='center'
        px='32'
        pb='32'
        pt='24'
        bg='bg.neutral.subtle.hovered'
        rounded='16'
      >
        <Flex flexDir='column' alignItems='center'>
          <Text fontSize='32' textAlign='center'>
            🥰
          </Text>
          <Heading as='h1' textAlign='center'>
            Already Subscribed
          </Heading>
        </Flex>
        <Text textStyle='body.lg' textAlign='center' color='text.subtleest'>
          This email is already confirmed. You're all set to receive our
          updates.
        </Text>
      </Flex>
      <Flex gap='20'>
        <Button
          as={Link}
          to='/'
          size='large'
          appearance='primary'
          iconAfter='finish'
        >
          Back to the site
        </Button>
        {!prefersReducedMotion && (
          <Button onClick={fireConfetti} size='large' appearance='subtle'>
            Celebrate
          </Button>
        )}
      </Flex>
    </SiteWrapper>
  );
}

import { Box, Text, Heading, Button } from '@okshaun/components';
import { Link, useSearchParams } from 'react-router-dom';
import { Flex } from '@styled-system/jsx';
import { SiteWrapper } from '../../components/SiteWrapper';

const ERROR_MESSAGES: Record<string, { title: string; message: string }> = {
  expired: {
    title: 'Link Expired',
    message:
      'This confirmation link has expired. Please sign up again to receive a new link.',
  },
  'not-found': {
    title: 'Link Not Found',
    message:
      "We couldn't find this subscription. The link may be invalid or already used.",
  },
  invalid: {
    title: 'Invalid Link',
    message: 'This confirmation link is invalid. Please try signing up again.',
  },
};

const DEFAULT_ERROR = {
  title: 'Something Went Wrong',
  message:
    'There was a problem confirming your subscription. Please try again.',
};

export default function NewsletterError() {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get('reason') || '';
  const { title, message } = ERROR_MESSAGES[reason] || DEFAULT_ERROR;

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
      <Box
        as='svg'
        viewBox='0 0 194 32'
        color='bg.neutral.bold'
        width='300'
        aria-hidden='true'
      >
        <use href='#mockingbird-arts-logotype' />
      </Box>
      <Flex
        flexDir='column'
        gap='16'
        alignItems='center'
        px='32'
        pb='32'
        pt='24'
        bg='bg.danger'
        rounded='16'
      >
        <Flex flexDir='column' alignItems='center'>
          <Text fontSize='32' textAlign='center'>
            🙁
          </Text>
          <Heading as='h1' textAlign='center' color='text.danger'>
            {title}
          </Heading>
        </Flex>
        <Text textStyle='body.lg' textAlign='center' color='text.danger/70'>
          {message}
        </Text>
      </Flex>
      <Button
        as={Link}
        to='/'
        size='large'
        appearance='primary'
        iconAfter='finish'
      >
        Back to the site
      </Button>
    </SiteWrapper>
  );
}

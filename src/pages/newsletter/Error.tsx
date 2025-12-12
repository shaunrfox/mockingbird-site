import { Box, Text, Heading, Button } from '@okshaun/components';
import { Link, useSearchParams } from 'react-router-dom';
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
  message: 'There was a problem confirming your subscription. Please try again.',
};

export default function NewsletterError() {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get('reason') || '';
  const { title, message } = ERROR_MESSAGES[reason] || DEFAULT_ERROR;

  return (
    <SiteWrapper py='64' gap='24' alignItems='center' maxWidth='lg'>
      <Box
        as='svg'
        viewBox='0 0 39 32'
        color='fg.danger'
        width='64'
        aria-hidden='true'
      >
        <use href='#mkbd-sm-bird' />
      </Box>
      <Heading as='h1' textAlign='center'>
        {title}
      </Heading>
      <Text size='lg' textAlign='center' color='fg.muted'>
        {message}
      </Text>
      <Button as={Link} to='/' variant='hollow' mt='8'>
        Back to Home
      </Button>
    </SiteWrapper>
  );
}

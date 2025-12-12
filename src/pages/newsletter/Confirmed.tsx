import { Box, Text, Heading, Button } from '@okshaun/components';
import { Link } from 'react-router-dom';
import { SiteWrapper } from '../../components/SiteWrapper';

export default function NewsletterConfirmed() {
  return (
    <SiteWrapper py='64' gap='24' alignItems='center' maxWidth='lg'>
      <Box
        as='svg'
        viewBox='0 0 39 32'
        color='fg.success'
        width='64'
        aria-hidden='true'
      >
        <use href='#mkbd-sm-bird' />
      </Box>
      <Heading as='h1' textAlign='center'>
        You're In!
      </Heading>
      <Text size='lg' textAlign='center' color='fg.muted'>
        Your subscription is confirmed. Thanks for joining the Mockingbird Arts
        community.
      </Text>
      <Button as={Link} to='/' variant='hollow' mt='8'>
        Back to Home
      </Button>
    </SiteWrapper>
  );
}

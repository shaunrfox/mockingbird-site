import { Box, Text, Heading, Button } from '@okshaun/components';
import { Link } from 'react-router-dom';
import { SiteWrapper } from '../../components/SiteWrapper';

export default function NewsletterAlreadyConfirmed() {
  return (
    <SiteWrapper py='64' gap='24' alignItems='center' maxWidth='lg'>
      <Box
        as='svg'
        viewBox='0 0 39 32'
        color='fg.muted'
        width='64'
        aria-hidden='true'
      >
        <use href='#mkbd-sm-bird' />
      </Box>
      <Heading as='h1' textAlign='center'>
        Already Subscribed
      </Heading>
      <Text size='lg' textAlign='center' color='fg.muted'>
        This email is already confirmed. You're all set to receive our updates.
      </Text>
      <Button as={Link} to='/' variant='hollow' mt='8'>
        Back to Home
      </Button>
    </SiteWrapper>
  );
}

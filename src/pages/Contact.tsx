import { Box, Text, Heading } from '@okshaun/components';
import { Grid } from '@styled-system/jsx';
import { SiteWrapper } from '../components/SiteWrapper';
import { ContactForm } from '../components/forms';

export default function Contact() {
  return (
    <SiteWrapper py='64' gap='32' alignItems='start' maxWidth='4xl'>
      <Heading as='h1'>Get in Touch</Heading>
      <Grid gridTemplateColumns={{ base: '1fr', sm: '1fr 2fr' }} gap='40'>
        <Text size='md' mb='4'>
          Have questions or want to get involved? Reach out to us and let's
          start a conversation.
        </Text>
        <Box>
          <ContactForm />
        </Box>
      </Grid>
    </SiteWrapper>
  );
}

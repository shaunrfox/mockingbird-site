import { Box, Text } from '@okshaun/components';
import { VStack } from '@styled-system/jsx';

export default function Team() {
  return (
    <VStack gap='6' p='8' maxW='1200px' mx='auto'>
      <Box>
        <Text as='h1' size='4xl' weight='bold' mb='4'>
          Our Team
        </Text>
        <Text size='lg' color='text.subtle'>
          Meet the team behind Mockingbird Arts
        </Text>
      </Box>

      <Box mt='8'>
        <Text size='md'>
          Our dedicated team members are passionate about supporting artists and
          building a vibrant creative community.
        </Text>
      </Box>
    </VStack>
  );
}

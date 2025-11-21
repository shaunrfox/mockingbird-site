import { Box, Text } from "@okshaun/components";
import { VStack } from "@styled-system/jsx";

export default function Contact() {
  return (
    <VStack gap="6" p="8" maxW="1200px" mx="auto">
      <Box>
        <Text as="h1" size="4xl" weight="bold" mb="4">
          Get in Touch
        </Text>
        <Text size="lg" color="text.subtle">
          We'd love to hear from you
        </Text>
      </Box>

      <Box mt="8">
        <Text size="md" mb="4">
          Have questions or want to get involved? Reach out to us and let's
          start a conversation.
        </Text>
        <Text size="md" color="text.subtle">
          Contact information coming soon.
        </Text>
      </Box>
    </VStack>
  );
}

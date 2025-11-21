import { Box, Text } from "@okshaun/components";
import { VStack } from "@styled-system/jsx";

export default function Home() {
  return (
    <VStack gap="6" p="8" maxW="1200px" mx="auto">
      <Box>
        <Text as="h1" size="4xl" weight="bold" mb="4">
          Welcome to Mockingbird Arts
        </Text>
        <Text size="lg" color="text.subtle">
          Your home for artistic expression and community
        </Text>
      </Box>

      <Box mt="8">
        <Text size="md">
          Mockingbird Arts is dedicated to fostering creativity and bringing
          together artists and art lovers in our community.
        </Text>
      </Box>
    </VStack>
  );
}

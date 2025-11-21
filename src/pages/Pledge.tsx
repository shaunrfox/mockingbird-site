import { Box, Text } from "@okshaun/components";
import { VStack } from "@styled-system/jsx";

export default function Pledge() {
  return (
    <VStack gap="6" p="8" maxW="1200px" mx="auto">
      <Box>
        <Text as="h1" size="4xl" weight="bold" mb="4">
          Support Our Mission
        </Text>
        <Text size="lg" color="text.subtle">
          Help us continue fostering artistic growth in our community
        </Text>
      </Box>

      <Box mt="8">
        <Text size="md">
          Your support enables us to provide resources, space, and opportunities
          for artists to thrive and share their work with the world.
        </Text>
      </Box>
    </VStack>
  );
}

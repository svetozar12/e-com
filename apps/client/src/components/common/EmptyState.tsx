import React from 'react';
import { Box, Text, VStack, Icon } from '@chakra-ui/react';
import { FiInbox } from 'react-icons/fi';

const EmptyState = () => {
  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
    >
      <VStack spacing={4}>
        <Icon as={FiInbox} boxSize="50px" color="gray.400" />
        <Text fontSize="xl" color="gray.600">
          No Items Found
        </Text>
        <Text color="gray.500">It looks like there are no items here yet.</Text>
      </VStack>
    </Box>
  );
};

export default EmptyState;

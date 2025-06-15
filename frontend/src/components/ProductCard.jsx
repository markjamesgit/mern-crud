import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, Heading, HStack, Image, Text, IconButton, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalCloseButton, VStack, Input, ModalFooter } from '@chakra-ui/react'
import { useToast, useDisclosure, ModalBody, Button, ModalHeader } from '@chakra-ui/react'; 
import { useProductStore } from '../store/product';

const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bgColor = useColorModeValue("white", "gray.800");
    const {isOpen, onOpen, onClose} = useDisclosure();

    const toast = useToast();
    const { deleteProduct } = useProductStore();

    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid);
        if(!success){    
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }            
        else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
      bg={bgColor}>

    <Image
      src={product.image}
      alt={product.name}
      borderRadius="md"
      boxSize="200px"
      objectFit="cover"
      mb={4}
      />

      <Box p={4}>
        <Heading as={"h3"} size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontSize="lg" color={textColor} mb={2}>
          ${product.price}
        </Text>

        <HStack spacing={2} justifyContent="flex-end">
          <IconButton icon={<EditIcon />} onClick={onOpen} variant="outline" colorScheme="blue" />
          <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} variant="outline" colorScheme="red" />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />

        <ModalContent>
            <ModalHeader>Edit Product</ModalHeader>
            <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Input
                            placeholder="Product Name"
                            name='name'
                        
                            />
                        <Input
                            placeholder="Price"
                            name='price'
                            type='number'
                            />
                        <Input
                            placeholder="Image URL"
                            name='image'
                         
                            />
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3}>
                        Update
                    </Button>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ProductCard

import {
    IconButton,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    VStack,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const BurgerMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                aria-label="Open Menu"
                icon={<HamburgerIcon />}
                onClick={onOpen}
                size="lg"
            />
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menú</DrawerHeader>
                    <DrawerBody>
                        <VStack spacing={4}>
                            <Button w="100%">
                                Página principal
                            </Button>
                            <Button w="100%">
                                Iniciar sesión
                            </Button>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default BurgerMenu;
import React from 'react';
import {
    Box,
    IconButton,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    VStack,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Popup from "./PopUp.jsx";
import Cookies from "js-cookie";

const BurgerMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isPopupOpen, onOpen: onOpenPopup, onClose: onClosePopup } = useDisclosure();
    const userId = Cookies.get('user_id');

    return (
        <Box p={4}>
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
                    <DrawerHeader style={{fontFamily: 'Spoof Trial, sans-serif'}}>Menú</DrawerHeader>
                    <DrawerBody>
                        <VStack spacing={4}>
                            <Button w="100%" onClick={onOpenPopup} style={{fontFamily: 'Spoof Trial, sans-serif'}}>Iniciar sesión</Button>
                            {userId ? (
                                <Button w="100%" style={{fontFamily: 'Spoof Trial, sans-serif'}}>Cerrar sesión</Button>
                            ) : (
                                <h1>Inicia sesión para continuar</h1>
                            )}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Popup isOpen={isPopupOpen} onClose={onClosePopup} />
        </Box>
    );
};



export default BurgerMenu;

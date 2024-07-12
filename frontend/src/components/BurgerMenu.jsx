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
import PopupCreate from "./PopUpCreate.jsx";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const BurgerMenu = ({ onLogout, onMyCourses }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isPopupOpen, onOpen: onOpenPopup, onClose: onClosePopup } = useDisclosure();
    const { isOpen: isPopupOpenCreate, onOpen: onOpenPopupCreate, onClose: onClosePopupCreate } = useDisclosure();
    const [userId, setUserId] = useState(null);
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const storedUserId = Cookies.get('user_id');
        const storedAdmin = Cookies.get('admin');

        if (storedUserId) {
            setUserId(parseInt(storedUserId, 10));
        }

        if (storedAdmin) {
            setAdmin(storedAdmin === "1");
        }
    }, [isPopupOpen]);

    const handleLogout = () => {
        Cookies.remove('user_id');
        Cookies.remove('email');
        Cookies.remove('token');
        Cookies.remove('admin');
        setUserId(null);
        setAdmin(null);
        onLogout();
    };

    const handleMyCourses = () => {
        if (userId) {
            onMyCourses(userId);
        }
        onClose();
    };

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
                            {userId ? (
                                <>
                                    <Button w="100%" onClick={handleLogout} style={{fontFamily: 'Spoof Trial, sans-serif'}}>Cerrar sesión</Button>
                                    {admin ? (
                                        <Button w="100%" onClick={onOpenPopupCreate} style={{fontFamily: 'Spoof Trial, sans-serif'}}>Crear curso</Button>
                                    ) : (
                                        <Button w="100%" onClick={handleMyCourses} style={{fontFamily: 'Spoof Trial, sans-serif'}}>Mis cursos</Button>
                                    )}
                                </>
                            ) : (
                                <Button w="100%" onClick={onOpenPopup} style={{fontFamily: 'Spoof Trial, sans-serif'}}>Iniciar sesión</Button>
                            )}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Popup isOpen={isPopupOpen} onClose={onClosePopup}/>
            <PopupCreate isOpen={isPopupOpenCreate} onClose={onClosePopupCreate} />
        </Box>
    );
};

export default BurgerMenu;
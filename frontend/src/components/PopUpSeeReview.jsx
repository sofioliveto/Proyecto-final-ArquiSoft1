import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton
} from "@chakra-ui/react";
import SeeReviews from "./SeeReviews.jsx";

const PopupSeeReview = ({ isOpen, onClose, courseId }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader style={{fontFamily: 'Spoof Trial, sans-serif'}}>Reviews</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <SeeReviews courseId={courseId} onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default PopupSeeReview;

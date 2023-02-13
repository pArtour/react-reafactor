import React from 'react'
import { FaTimes } from 'react-icons/fa';
import Modal from "react-modal";
import { ProductsForm } from '../ProductsForm/ProductsForm';
import { CreateProductPayload } from '../../types/products/CreateProductPayload';
import styles from "./ProductsModal.module.css";


interface ProductsModalProps {
    modalOpened: boolean;
    onCloseClick: () => void;
    onFormSubmit: (product: CreateProductPayload) => Promise<void>;
}
export const ProductsModal: React.FC<ProductsModalProps> = ({ modalOpened, onCloseClick, onFormSubmit }) => {
    return (
        <Modal
            isOpen={modalOpened}
            className={`${styles.reactModalContent} modal`}
            overlayClassName={styles.reactModalOverlay}
        >
            <div className={styles.modalContentHelper}>
                <div className={styles.modalClose} onClick={onCloseClick}>
                    <FaTimes />
                </div>

                <ProductsForm onSubmit={onFormSubmit} />
            </div>
        </Modal>
    );
};

import React from 'react';
import styles from "./ProductsMessage.module.css";

interface IProductsMessageProps {
	message: string;
}
export const ProductsMessage: React.FC<IProductsMessageProps> = ({message}) => {
    return (
        <div className={styles.container}>
            <i>{message}</i>
        </div>
    );
};

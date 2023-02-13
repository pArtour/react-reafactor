import React, { useRef } from "react";
import { Button } from "../../../shared/components/Button/Button";
import { CreateProductPayload } from "../../types/products/CreateProductPayload";
import styles from "./ProductsForm.module.css";

interface IProductsFormProps {
    onSubmit: (payload: CreateProductPayload) => Promise<void>;
}

export const ProductsForm: React.FC<IProductsFormProps> = ({ onSubmit }) => {
    let formRef = useRef<HTMLFormElement>(null);
    let titleRef = useRef<HTMLInputElement>(null);
    let priceRef = useRef<HTMLInputElement>(null);
    let descriptionRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!titleRef.current?.value) {
            alert("Your product needs a title");

            return;
        }

        if (!descriptionRef.current?.value || !priceRef.current?.value) {
            alert("Your product needs some content");

            return;
        }
        await onSubmit({
            title: titleRef.current && titleRef.current.value,
            description: descriptionRef.current && descriptionRef.current.value,
            price: priceRef.current && priceRef.current.value,
        });

        formRef.current?.reset();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
            <label htmlFor="title" className={styles.label}>
                Product title: *
            </label>

            <input
                id="title"
                name="title"
                ref={titleRef}
                placeholder="Title..."
                defaultValue=""
                className={styles.input}
            />

            <label htmlFor="price" className={styles.label}>
                Product details: *
            </label>

            <input
                id="price"
                name="price"
                ref={priceRef}
                placeholder="Price..."
                defaultValue=""
                className={styles.input}
            />

            <textarea
                cols={30}
                rows={10}
                ref={descriptionRef}
                placeholder="Start typing product description here..."
                defaultValue=""
                className={`${styles.input} ${styles.textarea}`}
            />

            <Button type="submit">Add a product</Button>
        </form>
    );
};

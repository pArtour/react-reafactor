import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../../shared/components/Button/Button";
import { IProduct } from "../../types/products/Product";
import { ProductsList } from "../ProductsList/ProductsList";
import styles from "./ProductsSection.module.css";
import { CreateProductPayload } from "../../types/products/CreateProductPayload";
import { ProductsModal } from "../ProductsModal/ProductsModal";
import { useModal } from "../../../shared/hooks/useModal";
import { ProductsMessage } from "../ProductsMessage/ProductsMessage";
import { ProductsStats } from "../ProductsStats/ProductsStats";

export const ProductsSection = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
   
    const [messageShown, setMessageShown] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const {isModalOpen, closeModal, openModal} = useModal();

    useEffect(() => {
        (async () => {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProducts(data);
        })();
    }, []);

    const toggleFavorite = (product: IProduct) => {
        const prods = [...products];
        const idx = prods.findIndex((prod) => prod.id === product.id);

        if (prods[idx].isFavorite) {
            prods[idx].isFavorite = false;
        } else {
            prods[idx].isFavorite = true;
        }

        setProducts(prods);
    };

    const createNewProduct = async (product: CreateProductPayload): Promise<void> => {
        closeModal();
        setMessageShown(true);
        setMessage("Adding product...");

        try {
            // **this POST request doesn't actually post anything to any database**
            const response = await fetch("https://fakestoreapi.com/products", {
                method: "POST",
                body: JSON.stringify({
                    title: product.title,
                    price: product.price,
                    description: product.description,
                }),
            });
            const newProduct = await response.json();
            setProducts((prevProducts) => [...prevProducts, { ...newProduct }]);
        } catch (error) {
            setMessage("Something went wrong");
        }
        setMessageShown(false);
        setMessage("");
    };


    /** Total number of products */
    const prodCount = useMemo(() => products.length, [products]);

    /** Number of favorite products */
    const numFavorites = useMemo(() => {
        return products.filter((product) => product.isFavorite).length;
    }, [products]);

    return (
        <>
            <section className={`container main ${styles.wrapper}`}>
                <div className={styles.buttonWrapper}>
                    <Button onClick={openModal}>Send product proposal</Button>
                    {messageShown ? (
                        <ProductsMessage message={message}/>
                    ) : null}
                </div>

                <ProductsStats numFavorites={numFavorites} prodCount={prodCount}/>
                {products && !!products.length ? (
                    <ProductsList products={products} onFavoriteClick={toggleFavorite} />
                ) : null}
            </section>
            <ProductsModal modalOpened={isModalOpen} onCloseClick={closeModal} onFormSubmit={createNewProduct} />
        </>
    );
};

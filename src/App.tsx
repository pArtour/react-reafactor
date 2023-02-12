import React, { useState, useEffect, useMemo } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Button } from "./components/button";
import { IProduct, Posts } from "./components/product-list-components";
import { Form, IFormPayload } from "./components/form";
import logo from "./images/droppe-logo.png";
import heroImageLeft from "./images/img1.png";
import heroImageRight from "./images/img2.png";
import styles from "./App.module.css";

export const App: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [modalOpened, setModalOpened] = useState<boolean>(false);
    const [messageShown, setMessageShown] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");


    useEffect(() => {
        (async () => {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProducts(data);
        })();
    }, []);

    const favClick = (product: IProduct) => {
        const prods = [...products];
        const idx = prods.findIndex((prod) => prod.id === product.id);

        if (prods[idx].isFavorite) {
            prods[idx].isFavorite = false;
        } else {
            prods[idx].isFavorite = true;
        }

        setProducts(prods);
    };

    const onSubmit = async (product: IFormPayload): Promise<void> => {
        closeModal();
        setMessageShown(true);
        setMessage("Adding product...");

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
        setMessageShown(false);
        setMessage("");
    };

    const closeModal = () => {
        setModalOpened(false);
    };

    const openModal = () => {
        setModalOpened(true);
    };

    const prodCount = useMemo(() => products.length, [products]);

    const numFavorites = useMemo(() => {
        return products.filter((product) => product.isFavorite).length;
    }, [products]);

    return (
        <>
            <div className={styles.header}>
                <div className={`container ${styles.headerImageWrapper}`}>
                    <img src={logo} alt="Droppe official shop" className={styles.headerImage} />
                </div>
            </div>
            <span
                className={`container ${styles.main}`}
                style={{ margin: "50px inherit", display: "flex", justifyContent: "space-evenly" }}
            >
                <img
                    src={heroImageLeft}
                    alt="Droppe hero secrion left"
                    style={{ maxHeight: "15em", display: "block" }}
                />
                <img
                    src={heroImageRight}
                    alt="Droppe hero section right"
                    style={{ maxHeight: "15rem", display: "block" }}
                />
            </span>

            <div className={`container ${styles.main}`} style={{ paddingTop: 0 }}>
                <div className={styles.buttonWrapper}>
                    <span role="button">
                        <Button onClick={openModal}>Send product proposal</Button>
                    </span>
                    {messageShown && (
                        <div className={styles.messageContainer}>
                            <i>{message}</i>
                        </div>
                    )}
                </div>

                <div className={styles.statsContainer}>
                    <span>Total products: {prodCount}</span>
                    {" - "}
                    <span>Number of favorites: {numFavorites}</span>
                </div>

                {products && !!products.length ? <Posts products={products} onFav={favClick} /> : null}
            </div>
            <Modal
                isOpen={modalOpened}
                className={styles.reactModalContent}
                overlayClassName={styles.reactModalOverlay}
            >
                <div className={styles.modalContentHelper}>
                    <div className={styles.modalClose} onClick={closeModal}>
                        <FaTimes />
                    </div>

                    <Form on-submit={onSubmit} />
                </div>
            </Modal>
        </>
    );
};

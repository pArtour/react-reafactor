import React, { useEffect, useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import styles from "./App.module.css";
import { Button } from "./components/button/button";
import { Form, IFormPayload } from "./components/form";
import { IProduct } from "./components/Product";
import { ProductsList } from "./components/product-list-components";
import logo from "./images/droppe-logo.png";
import heroImageLeft from "./images/img1.png";
import heroImageRight from "./images/img2.png";

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

    /** Total number of products */
    const prodCount = useMemo(() => products.length, [products]);

    /** Number of favorite products */
    const numFavorites = useMemo(() => {
        return products.filter((product) => product.isFavorite).length;
    }, [products]);

    return (
        <>
            <header className={styles.header}>
                <div className={`container ${styles.headerImageWrapper}`}>
                    <img src={logo} alt="Droppe official shop" className={styles.headerImage} />
                </div>
            </header>
            <main>
                <section
                    className={`container ${styles.main}`}
                    style={{ margin: "50px inherit", display: "flex", justifyContent: "space-evenly" }}
                >
                    <img src={heroImageLeft} alt="Droppe hero secrion left" style={{ maxHeight: "15em" }} />
                    <img src={heroImageRight} alt="Droppe hero section right" style={{ maxHeight: "15rem" }} />
                </section>
                <section className={`container ${styles.main}`} style={{ paddingTop: 0 }}>
                    <div className={styles.buttonWrapper}>
                        <Button onClick={openModal}>Send product proposal</Button>
                        {messageShown ? (
                            <div className={styles.messageContainer}>
                                <i>{message}</i>
                            </div>
                        ) : null}
                    </div>

                    <div className={styles.statsContainer}>
                        Total products: {prodCount} - Number of favorites: {numFavorites}
                    </div>
                    {products && !!products.length ? <ProductsList products={products} onFav={favClick} /> : null}
                </section>
            </main>
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

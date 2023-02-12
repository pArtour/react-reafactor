import React, {useState, useEffect, useMemo} from "react";
import lodash from "lodash";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Button } from "./components/button";
import ProductList from "./components/product-list-components";
import { Form } from "./components/form";
import logo from "./images/droppe-logo.png";
import heroImageLeft from "./images/img1.png";
import heroImageRight from "./images/img2.png";
import styles from "./App.module.css";

/** App component props interface */
interface AppProps {}

/** App component state interface */
interface AppState {
    products: any[];
    modalOpened: boolean;
    messageShown: boolean;
    message: string;
    numFavorites: number;
    prodCount: number;
}


export const App: React.FC<AppProps> = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [modalOpened, setModalOpened] = useState<boolean>(false);
    const [messageShown, setMessageShown] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [numFavorites, setNumFavorites] = useState<number>(0);


    useEffect(() => {
        document.title = "Droppe refactor app";
    }, []);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products").then((response) => {
            let jsonResponse = response.json();
            jsonResponse.then((data) => {
                setProducts(data);
            });
        });
    }, []);

    const favClick = (title: string) => {
        const prods = lodash.clone(products);
        const idx = lodash.findIndex(prods, { title: title });
        let currentFavs = numFavorites;
        let totalFavs: any;

        if (prods[idx].isFavorite) {
            prods[idx].isFavorite = false;
            totalFavs = --currentFavs;
        } else {
            totalFavs = ++currentFavs;
            prods[idx].isFavorite = true;
        }

        setProducts(prods);
        setNumFavorites(totalFavs);
    };

    const onSubmit = (payload: { title: string; description: string; price: string }) => {
        const updated = lodash.clone(products);
        updated.push({
            title: payload.title,
            description: payload.description,
            price: payload.price,
        });

        setProducts(updated);

        closeModal();

        setMessageShown(true);

        setMessage("Adding product...");

        // **this POST request doesn't actually post anything to any database**
        fetch("https://fakestoreapi.com/products", {
            method: "POST",
            body: JSON.stringify({
                title: payload.title,
                price: payload.price,
                description: payload.description,
            }),
        })
            .then((res) => res.json())
            .then(() => {
                setMessageShown(false);
                setMessage("");
            });
    };
    
    const closeModal = () => {
        setModalOpened(false);
    }

    const openModal = () => {
        setModalOpened(true);
    } 

     const prodCount = useMemo(() => lodash.size(products), [products]);

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
                        <Button
                            onClick={openModal}
                        >
                            Send product proposal
                        </Button>
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

                {products && !!products.length ? (
                    <ProductList products={products} onFav={favClick} />
                ) : null}
            </div>
            <Modal isOpen={modalOpened} className={styles.reactModalContent} overlayClassName={styles.reactModalOverlay}>
                <div className={styles.modalContentHelper}>
                    <div
                        className={styles.modalClose}
                        onClick={closeModal}
                    >
                        <FaTimes />
                    </div>

                    <Form on-submit={onSubmit} />
                </div>
            </Modal>
        </>
    );
}

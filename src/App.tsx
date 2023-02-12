import * as React from "react";
import lodash from "lodash";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Button } from "./components/button";
import ProductList from "./components/product-list-components";
import { Form } from "./components/form";
import logo from "./images/droppe-logo.png";
import heroImageLeft from "./images/img1.png";
import heroImageRight from "./images/img2.png";
import styles from "./shopApp.module.css";

/** App component props interface */
interface AppProps {}

/** App component state interface */
interface AppState {
    products: any[];
    isOpen: boolean;
    isShowingMessage: boolean;
    message: string;
    numFavorites: number;
    prodCount: number;
}

export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.favClick = this.favClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            products: [],
            isOpen: false,
            isShowingMessage: false,
            message: "",
            numFavorites: 0,
            prodCount: 0,
        };

        fetch("https://fakestoreapi.com/products").then((response) => {
            let jsonResponse = response.json();

            jsonResponse.then((rawData) => {
                let data = [];

                for (let i = 0; i < rawData.length; i++) {
                    let updatedProd = rawData[i];
                    data.push(updatedProd);
                }
                this.setState({
                    products: data,
                });
                this.setState({
                    prodCount: data.length,
                });
            });
        });
    }

    componentDidMount() {
        document.title = "Droppe refactor app";
    }

    favClick(title: string) {
        const prods = this.state.products;
        const idx = lodash.findIndex(prods, { title: title });
        let currentFavs = this.state.numFavorites;
        let totalFavs: any;

        if (prods[idx].isFavorite) {
            prods[idx].isFavorite = false;
            totalFavs = --currentFavs;
        } else {
            totalFavs = ++currentFavs;
            prods[idx].isFavorite = true;
        }

        this.setState(() => ({ products: prods, numFavorites: totalFavs }));
    }

    onSubmit(payload: { title: string; description: string; price: string }) {
        const updated = lodash.clone(this.state.products);
        updated.push({
            title: payload.title,
            description: payload.description,
            price: payload.price,
        });

        this.setState({
            products: updated,
            prodCount: lodash.size(this.state.products) + 1,
        });

        this.setState({
            isOpen: false,
        });

        this.setState({
            isShowingMessage: true,
            message: "Adding product...",
        });

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
            .then((json) => {
                (function (t) {
                    setTimeout(() => {
                        t.setState({
                            isShowingMessage: false,
                            message: "",
                        });
                    }, 2000);
                })(this);
            });
    }

    render() {
        const { products, isOpen } = this.state;
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
                                onClick={function (this: any) {
                                    this.setState({
                                        isOpen: true,
                                    });
                                }.bind(this)}
                            >
                                Send product proposal
                            </Button>
                        </span>
                        {this.state.isShowingMessage && (
                            <div className={styles.messageContainer}>
                                <i>{this.state.message}</i>
                            </div>
                        )}
                    </div>

                    <div className={styles.statsContainer}>
                        <span>Total products: {this.state.prodCount}</span>
                        {" - "}
                        <span>Number of favorites: {this.state.numFavorites}</span>
                    </div>

                    {products && !!products.length ? (
                        <ProductList products={products} onFav={this.favClick} />
                    ) : (
                        <div></div>
                    )}
                </div>
                <Modal isOpen={isOpen} className={styles.reactModalContent} overlayClassName={styles.reactModalOverlay}>
                    <div className={styles.modalContentHelper}>
                        <div
                            className={styles.modalClose}
                            onClick={function (this: any) {
                                this.setState({
                                    isOpen: false,
                                });
                            }.bind(this)}
                        >
                            <FaTimes />
                        </div>

                        <Form on-submit={this.onSubmit} />
                    </div>
                </Modal>
            </>
        );
    }
}

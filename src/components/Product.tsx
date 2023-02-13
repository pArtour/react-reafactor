import React from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "./button/button";
import styles from "./Product.module.css"

export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    isFavorite: boolean;
    rating: { rate: number; count: number };
}

export const Product: React.FC<{
    index: number;
    product: IProduct;
    onFav: (product: IProduct) => void;
}> = ({ product, onFav }) => {
    const { product: productClass, productBody, actionBarItem, actionBarItemLabel } = styles;
    // Problem: Now product title can be too long, I just put overflowX as fix now
    return (
        <div
            className={productClass}
            style={{ display: "inline-block", overflowX: "scroll", float: "none", clear: "both" }}
        >
            <span className={styles["product-title"]} style={{ overflowX: "hidden" }}>
                {product.title}
            </span>
            <p>
                <strong>Rating: {product.rating ? `${product.rating.rate}/5` : ""}</strong>
            </p>
            <p>
                <b>Price: ${+product.price}</b>
            </p>

            <p className={productBody}>
                <span>
                    <b>Description:</b>
                </span>
                <br />
                {product.description}
            </p>

            <div className={styles["action_bar"]}>
                <Button
                    type="button"
                    primary={false}
                    className={`${actionBarItem} ${product.isFavorite ? styles.active : ""}`}
                    onClick={() => onFav(product)}
                >
                    <FaStar style={{marginRight: 4}} />{" "}
                    <span className={actionBarItemLabel}>
                        {product.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    </span>
                </Button>
            </div>
        </div>
    );
};

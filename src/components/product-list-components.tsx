import React from "react";
import { FaStar } from "react-icons/fa";
import styles from "./product-list-components.module.css";

interface IProductsList {
    products: IProduct[];
    onFav: (title: IProduct) => void;
}

export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    isFavorite: boolean;
    rating: { rate: number; count: number };
}
export const ProductsList: React.FC<IProductsList> = ({ products, onFav }) => {
    return (
        <div>
            {products.map((product, index) => (
                <Product key={index} index={index} product={product} onFav={onFav} />
            ))}
        </div>
    );
};

export const Product: React.FC<{
    index: number;
    product: IProduct;
    onFav: (product: IProduct) => void;
}> = ({ product, onFav }) => {
    const { product: productClass, productBody, actionBarItem, actionBarItemLabel } = styles;
    // Problem: Now product title can be too long, I just put overflowX as fix now
    return (
        <span
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

            <span className={styles["action_bar"]} style={{ display: "table", width: "100%" }}>
                <span
                    className={`${actionBarItem} ${product.isFavorite ? "active" : ""}`}
                    role="button"
                    onClick={() => {
                        onFav(product);
                    }}
                >
                    <FaStar />{" "}
                    <span className={actionBarItemLabel}>
                        {!!!!product.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    </span>
                </span>
            </span>
        </span>
    );
};

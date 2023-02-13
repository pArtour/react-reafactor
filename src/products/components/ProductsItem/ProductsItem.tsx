import React from "react";
import { FaStar } from "react-icons/fa";
import { IProduct } from "../../types/products/Product";
import { Button } from "../../../shared/components/Button/Button";
import styles from "./ProductsItem.module.css";

interface IProductsItemProps {
    product: IProduct;
    onFavoriteClick: (product: IProduct) => void;
}

export const ProductsItem: React.FC<IProductsItemProps> = ({ product, onFavoriteClick }) => {
    return (
        <div
            className={styles.product}
            style={{ display: "inline-block", overflowX: "scroll", float: "none", clear: "both" }}
        >
            <h3 className={styles.productTitle}>{product.title}</h3>
            <p>
                <strong>Rating: {product.rating ? `${product.rating.rate}/5` : ""}</strong>
            </p>
            <p>
                <b>Price: ${+product.price}</b>
            </p>

            <p className={styles.productBody}>
                <span>
                    <b>Description:</b>
                </span>
                <br />
                {product.description}
            </p>

            <div className={styles.actionBar}>
                <Button
                    type="button"
                    primary={false}
                    className={`${styles.actionBarItem} ${product.isFavorite ? styles.active : ""}`}
                    onClick={() => onFavoriteClick(product)}
                >
                    <FaStar style={{ marginRight: 4 }} />{" "}
                    <span className={styles.actionBarItemLabel}>
                        {product.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    </span>
                </Button>
            </div>
        </div>
    );
};

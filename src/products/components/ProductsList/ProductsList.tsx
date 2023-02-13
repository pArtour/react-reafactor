import React from "react";
import { IProduct } from "../../types/products/Product";
import { ProductsItem } from "../ProductsItem/ProductsItem";

interface IProductsList {
    products: IProduct[];
    onFavoriteClick: (title: IProduct) => void;
}

export const ProductsList: React.FC<IProductsList> = ({ products, onFavoriteClick }) => {
    return (
        <div>
            {products.map((product, index) => (
                <ProductsItem key={index} product={product} onFavoriteClick={onFavoriteClick} />
            ))}
        </div>
    );
};

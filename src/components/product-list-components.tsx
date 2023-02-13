import React from "react";
import { IProduct, Product } from "./product/Product";

interface IProductsList {
    products: IProduct[];
    onFav: (title: IProduct) => void;
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

import React from 'react';
import styles from './ProductsStats.module.css';

interface IProductsStatsProps {
	prodCount: number;
	numFavorites: number;
}
export const ProductsStats: React.FC<IProductsStatsProps> = ({prodCount, numFavorites}) => {
  return (
      <div className={styles.container}>
          Total products: {prodCount} - Number of favorites: {numFavorites}
      </div>
  );
}

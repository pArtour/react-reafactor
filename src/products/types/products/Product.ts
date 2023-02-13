interface IProductRating {
    rate: number;
    count: number;
}
export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    isFavorite: boolean;
    rating: IProductRating;
}
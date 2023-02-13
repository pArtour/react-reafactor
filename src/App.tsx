import React from "react";
import { ProductsSection } from "./products/components/ProductsSection/ProductsSection";
import { Header } from "./shared/components/Header/Header";
import { Hero } from "./shared/components/Hero/Hero";
import { Shell } from "./shared/components/Shell/Shell";

export const App: React.FC = () => {
    return (
        <>
            <Header />
            <Shell>
                <Hero />
                <ProductsSection/>
            </Shell>
        </>
    );
};

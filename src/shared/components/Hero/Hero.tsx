import React from "react";
import heroImageLeft from "../../../images/img1.png"
import heroImageRight from "../../../images/img2.png";
import styles from "./Hero.module.css";

export const Hero: React.FC = () => {
    return (
        <section className={`container main ${styles.hero}`}>
            <img className={styles.heroImage} src={heroImageLeft} alt="Droppe hero secrion left" />
            <img className={styles.heroImage} src={heroImageRight} alt="Droppe hero section right" />
        </section>
    );
};

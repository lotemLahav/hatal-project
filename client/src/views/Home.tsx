import { useGetProducts } from "../api/hooks/product/useGetProducts";
import { Gallery } from "../components/Gallery";

export const Home = () => {
    const cardProps = useGetProducts();

    return (
        <>
            <Gallery productProps={cardProps} />
        </>
    );
};

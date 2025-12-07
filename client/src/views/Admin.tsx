import { useGetProducts } from "../api/hooks/product/useGetProducts";
import { Gallery } from "../components/Gallery";

export const Admin = () => {
    const cardProps = useGetProducts();

    return (
        <>
            <Gallery productProps={cardProps} />
        </>
    );
};

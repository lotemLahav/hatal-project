import { FC, useEffect, useState } from "react";
import { ProductCard } from "../productCard/ProductCard";
import { Genre, Production, ProductProps } from "../../utils/types";
import { useGetProductsByGenre } from "../../api/hooks/product/useGetProductsByGenre";
import { useGetProductsByProduction } from "../../api/hooks/product/useGetProductsByProduction";
import Swal from "sweetalert2";

interface CardProps { productProps: ProductProps[]; }

export const Gallery: FC<CardProps> = ({ productProps }) => {
    const [products, setProducts] = useState<ProductProps[]>(productProps);
    const { fetchProductsByGenre } = useGetProductsByGenre();
    const { fetchProductsByProduction } = useGetProductsByProduction();

    useEffect(() => {
        if (productProps && productProps.length > 0) {
            setProducts(productProps);
        }
    }, [productProps]);

    const handleClick = async (category: string) => {
        try {
            if (Object.values(Production).includes(category)) {
                const fetched = await fetchProductsByProduction(category);
                setProducts(fetched);
            } else if (Object.values(Genre).includes(category)) {
                const fetched = await fetchProductsByGenre(category);
                setProducts(fetched);
            } else {
                console.warn("Category not found:", category);
            }
        } catch (error) {
            Swal.fire("There's a problem!", "Can't load products", "error");
            console.error(error);
        }
    }

    return (
        <>
            <div className="d-flex">

                {/* Sidebar */}
                <div
                    className="d-flex flex-column justify-content-center align-items-center p-3 bg-light"
                    style={{ width: "230px", height: "100vh", margin: 0 }}
                >
                    <span className="fs-4 mb-3" style={{ color: "#F39C42" }}>Filter By Categories</span>
                    <hr style={{ width: "100%" }} />

                    <ul className="nav nav-pills flex-column mb-auto text-center">
                        {[
                            "drama",
                            "comedy",
                            "tragedy",
                            "romance",
                            "jukebox",
                            "broadway",
                            "off broadway",
                            "west end",
                            "starkid",
                        ].map((category, i) => (
                            <li key={i} className="nav-item mb-2 text-center">
                                <button
                                    className="nav-link link-dark text-center" style={{ color: "#1E3D5A" }}
                                    onClick={() => handleClick(category)}
                                    onMouseEnter={e => (e.currentTarget.style.color = "#F39C42")}
                                    onMouseLeave={e => (e.currentTarget.style.color = "#1E3D5A")}
                                >
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Gallery content */}
                <div className="content d-flex flex-wrap p-4 flex-grow-1">
                    {products.map((product, i) => (
                        <div key={i} className="img-box p-3">
                            <ProductCard productProps={product} />
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
};

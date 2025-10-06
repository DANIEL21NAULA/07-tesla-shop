import { CustomPagination } from "@/components/custom/CustomPagination";
import { products } from "@/mocks/products.mock";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useParams } from "react-router";

export const GenderPage = () => {
  const {gender} = useParams();
  let genderLabel: string;
  
  switch (gender) {
      case 'men':
        genderLabel = 'Hombres';
        break;
      case 'women':
        genderLabel = "Mujeres";
        break;
      default:
        genderLabel = "Niños";
        break;
  }


  return(
    <>
      <CustomJumbotron title={`Todos los productos ${genderLabel}`} />
      <ProductsGrid products={products}/>
      <CustomPagination totalPages={7}/>
    </>
  );
}

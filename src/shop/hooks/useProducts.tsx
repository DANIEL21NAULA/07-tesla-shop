import { useQuery } from '@tanstack/react-query';
import { getProductsActions } from '../actions/get-products.actions';
import { useParams, useSearchParams } from 'react-router';

export const useProducts = () => {
  const { gender } = useParams();
  const [ searchParams ] = useSearchParams();

  const limit = searchParams.get('limit') || import.meta.env.VITE_LIMIT_LIST_PRODUCT
  const page = searchParams.get('page') || import.meta.env.VITE_PAGE_LIST_PRODUCT
  const sizes = searchParams.get('sizes') || undefined;
  const offset = (Number(page) - 1) * Number(limit);
  const price = searchParams.get('price') || 'any';
  const query = searchParams.get('query') || undefined;
  let minPrice = undefined;
  let maxPrice = undefined;
  
  switch (price) {
    case 'any': 
      break;
    case '0-50':
      minPrice = 0;
      maxPrice = 50; 
      break;
    case '50-100':
      minPrice = 50;
      maxPrice = 100; 
      break;
    case '100-200':
      minPrice = 100;
      maxPrice = 200; 
      break;
    case '200+':
      minPrice = 200;
      maxPrice = undefined; 
      break;
    default:
      break;
  }

  return useQuery({
    queryKey:['products', { limit, offset, gender, sizes, minPrice, maxPrice, query }],//! esto permite que se vuelva realizar la consulta si cambia una de estas 2 variables
    queryFn: () => getProductsActions({
      limit: isNaN(limit) ? import.meta.env.VITE_LIMIT_LIST_PRODUCT : limit,
      offset: isNaN(offset) ? 0 : offset,
      gender,
      sizes,
      minPrice,
      maxPrice,
      query,
      //sizes : sizes.length > 0 ? sizes.join(',') : '';
    }),
    staleTime: 1000 * 60 * 5 //! esto permite que no se haga las consultas a la base de datos y lo mantenga en cache por 5 min
  });
}

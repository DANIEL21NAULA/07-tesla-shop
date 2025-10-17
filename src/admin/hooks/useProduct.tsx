import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductByIdAction } from "../actions/get-product-by-id.action";
import type { Product } from "@/interfaces/product.interface";
import { createUpdateProductAction } from "../actions/create-update-product.action";

export const useProduct = (id: string) => {

  const queryCliente = useQueryClient();
  const query = useQuery({
    queryKey: ['product', {id}],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    //enabled: !!id, se dispara la peticion hasta que se tenga un id
  });

  //TODO: MUTACION
  const createUptadeMutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      //* esto es para que se vuelva a realizar las peticiones en las rutas que tienen products
      queryCliente.invalidateQueries({queryKey: ['products']});
      queryCliente.invalidateQueries({queryKey: ['product', {id: product.id}]});
      queryCliente.setQueryData(['products', {id: product.id}], product); //* no envia esta peticion porque se encuentra guardada en cache
      // TODO: Invalidar cache, Actualizar queryData
    },
  });


  // const handleSubmitForm = async(productLike: Partial<Product>) => {
  //   console.log('estoyn en tankstack')
  //   console.log({ productLike })
  // }

  return {
    ...query,
    createUptadeMutation,
  };
}

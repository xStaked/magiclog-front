import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const usePaginationAndFetch = (
  fetchProducts: (offset: number, limit: number) => void,
  fetchSellers?: () => void,
  url: string = "/admin/products",
  defaultPage = 1,
  defaultLimit = 12
) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(
    searchParams.get("page") || defaultPage.toString()
  );
  const limit = parseInt(searchParams.get("limit") || defaultLimit.toString());

  useEffect(() => {
    const paramsInUrl = searchParams.has("page") && searchParams.has("limit");

    if (!paramsInUrl) {
      router.replace(`${url}?page=${defaultPage}&limit=${defaultLimit}`);
    } else {
      const offset = (currentPage - 1) * limit;
      fetchProducts(offset, limit);
      if (fetchSellers) {
        fetchSellers();
      }
    }
  }, [currentPage, limit, router, searchParams, url]);

  const handlePageChange = (newPage: number) => {
    router.push(`${url}?page=${newPage}&limit=${limit}`);
  };

  return { currentPage, limit, handlePageChange };
};

export default usePaginationAndFetch;

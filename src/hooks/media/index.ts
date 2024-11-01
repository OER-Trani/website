import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../lib/react-query/constants';
import wpClient from '../../lib/wpapi/client';
import { makeWpApiCall } from '../../lib/wpapi/features';

interface IGetMedia {
  id: number;
}

export function useGetMedia({ id }: IGetMedia) {
  return useQuery(
    {
      enabled: true,
      queryKey: ['media', id],
      queryFn: async function () {
        const cb = async () => wpClient.media().id(id);
        const response = await makeWpApiCall(cb());
        return response;
      },
    },
    queryClient,
  );
}

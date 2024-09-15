import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../lib/react-query/constants';
import { makeWpApiCall } from '../../lib/wpapi/features';
import { wpMedia } from '../../lib/wpapi/features/media';

interface IGetMedia {
  id: number;
}

export function useGetMedia({ id }: IGetMedia) {
  return useQuery(
    {
      enabled: true,
      queryKey: ['media', id],
      queryFn: async function () {
        const cb = async () => wpMedia.id(id);
        const response = await makeWpApiCall(cb());
        return response;
      },
    },
    queryClient,
  );
}

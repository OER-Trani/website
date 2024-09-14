import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../lib/react-query/constants';
import wpClient from '../../lib/wpapi/client';
import { getMedia } from '../../lib/wpapi/features/media';

interface IGetMedia {
  id: number;
}

export function useGetMedia({ id }: IGetMedia) {
  return useQuery(
    {
      enabled: true,
      queryKey: ['media', id],
      queryFn: async function () {
        const response = await getMedia(wpClient, id);
        return response;
      },
    },
    queryClient,
  );
}

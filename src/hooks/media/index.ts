import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../lib/react-query/constants';
import { getWpPost } from '../../lib/wp-rest-api';
import { mapPath } from '../../lib/wp-rest-api/constants';
import type { MediaType } from '../../lib/wp-rest-api/types/media';

interface IGetMedia {
  id: number;
}

export function useGetMedia({ id }: IGetMedia) {
  return useQuery(
    {
      enabled: true,
      queryKey: ['media', id],
      queryFn: async function () {
        const response = await getWpPost<MediaType>({ id: id, path: mapPath.media });
        return response;
      },
    },
    queryClient,
  );
}

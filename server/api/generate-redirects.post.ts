import { groupBy, isEmpty, map } from 'lodash-es';
import { generateRewrites } from '~/lib/url-rewrite/utils';
import { Redirect } from '~/types/redirect.model';

export default defineEventHandler(async event => {
  const body = await readBody(event);

  if (isEmpty(body)) {
    setResponseStatus(event, 400);
    return;
  }
  const entries = Object.entries<string>(body);
  const groupedEntries = groupBy<[string, string]>(entries, ([key]) => key.split('_')[1]);

  const groupedData: Redirect[] = map(groupedEntries, group => ({
    oldUrl: group?.find(([key]) => key.startsWith('oldUrl_'))?.[1] ?? '',
    newUrl: group?.find(([key]) => key.startsWith('newUrl_'))?.[1] ?? '',
  }));

  const redirects = groupedData.map(({ oldUrl, newUrl }) => generateRewrites({ oldUrl, newUrl }));

  return {
    redirects,
  };
});

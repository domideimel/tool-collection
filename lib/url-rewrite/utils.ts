export const generateRewrites = ({
  oldUrl,
  newUrl,
  is301 = true,
}: {
  oldUrl: string;
  newUrl: string;
  is301?: boolean;
}): string => {
  try {
    const url = new URL(oldUrl);

    if (!url) {
      new Error('Invalid URL');
    }

    const statusCode = is301 ? 301 : 302;

    const path = preparePathForRegex(url.pathname);
    const query = preparePathForRegex(url.search);
    const host = preparePathForRegex(url.hostname);

    if (!query.length) {
      return `RewriteCond %{HTTP_HOST} ${host}$
RewriteCond %{REQUEST_URI} ^${path}$
RewriteRule .* RewriteRule .* ${newUrl} [NE,R=${statusCode},L]`;
    }

    return `RewriteCond %{HTTP_HOST} ${host}$
RewriteCond %{QUERY_STRING} ^${query}$
RewriteCond %{REQUEST_URI} ^${path}$
RewriteRule .* RewriteRule .* ${newUrl} [NE,R=${statusCode},L]`;
  } catch (error: any) {
    return error.message;
  }
};

const preparePathForRegex = (path: string): string => {
  return path.replaceAll(/[\^$*+?{}\[\]\\|()\-\/_.]/g, '\\$&');
};

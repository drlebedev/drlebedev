/**
 * Resolves static public assets relative to the current application base URL.
 * Supports both root domain deployments (e.g. https://drlebedev.com)
 * and subpath deployments (e.g. GitHub Pages https://drlebedev.github.io/drlebedev/).
 */
export const getAssetUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL || './';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  if (base.endsWith('/')) {
    return `${base}${cleanPath}`;
  }
  return `${base}/${cleanPath}`;
};

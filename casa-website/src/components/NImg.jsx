/**
 * Builds a Netlify Image CDN URL.
 * Falls back to original src in local dev (/.netlify/images not available).
 */
export const netlifyImageUrl = (src, { w, q = 85 } = {}) => {
  if (!src) return src;
  if (import.meta.env.DEV) return src;
  const params = new URLSearchParams({ url: src, q });
  if (w) params.set('w', String(w));
  return `/.netlify/images?${params}`;
};

/**
 * Drop-in replacement for <img> that routes through Netlify Image CDN.
 * In dev mode uses the plain src path directly.
 */
const NImg = ({ src, w, q = 85, alt = '', ...rest }) => (
  <img src={netlifyImageUrl(src, { w, q })} alt={alt} {...rest} />
);

export default NImg;

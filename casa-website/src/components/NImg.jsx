/**
 * Builds a Netlify Image CDN URL.
 * The CDN auto-converts to WebP/AVIF, resizes, and serves from edge nodes globally.
 * Falls back to the original src in local dev (/.netlify/images won't be available).
 *
 * @param {string} src   - e.g. "/assets/FrontHouse.jpg"
 * @param {object} opts  - { w: number, q: number }
 */
export const netlifyImageUrl = (src, { w, q = 85 } = {}) => {
  if (!src) return src;
  const params = new URLSearchParams({ url: src, q });
  if (w) params.set('w', String(w));
  return `/.netlify/images?${params}`;
};

/**
 * Drop-in replacement for <img> that routes through Netlify Image CDN.
 * Accepts all standard <img> props plus `w` (width) and `q` (quality).
 */
const NImg = ({ src, w, q = 85, alt = '', ...rest }) => (
  <img src={netlifyImageUrl(src, { w, q })} alt={alt} {...rest} />
);

export default NImg;

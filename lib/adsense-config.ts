/**
 * Google AdSense & Monetization Configuration
 * Controls whether AdSense scripts and ad slots are active.
 *
 * Defaults to false until real AdSense account is approved and configured.
 * When false:
 * - No external Google AdSense scripts are injected.
 * - No mock or misleading advertisement containers are rendered.
 * - The entire website operates cleanly and natively for optimal user experience and SEO.
 */
export const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';

export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';

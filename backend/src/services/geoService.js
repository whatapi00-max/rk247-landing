import logger from '../config/logger.js';

function isPrivateIp(ip) {
  if (!ip) return true;
  const clean = ip.replace('::ffff:', '');
  return (
    clean === '::1' ||
    clean === '127.0.0.1' ||
    clean === 'localhost' ||
    clean.startsWith('10.') ||
    clean.startsWith('192.168.') ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(clean)
  );
}

/**
 * Extract the real client IP from the request, honoring X-Forwarded-For
 * when behind a proxy (app.set('trust proxy', 1) is required for req.ip
 * to reflect this too).
 */
export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return (req.ip || req.socket?.remoteAddress || '').replace('::ffff:', '');
}

/**
 * Look up city/region/country/ISP for a public IP address using ip-api.com
 * (free tier, no API key required). Private/local IPs are returned as-is
 * without a network call.
 */
export async function lookupIpInfo(ip) {
  const clean = (ip || '').replace('::ffff:', '');

  if (isPrivateIp(clean)) {
    return {
      ip: clean || 'unknown',
      city: null,
      region: null,
      country: null,
      isp: 'Local Network'
    };
  }

  try {
    const response = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(clean)}?fields=status,message,country,regionName,city,isp,query`
    );
    const data = await response.json();

    if (data.status !== 'success') {
      return { ip: clean, city: null, region: null, country: null, isp: null };
    }

    return {
      ip: data.query || clean,
      city: data.city || null,
      region: data.regionName || null,
      country: data.country || null,
      isp: data.isp || null
    };
  } catch (error) {
    logger.warn('IP geolocation lookup failed:', error.message);
    return { ip: clean, city: null, region: null, country: null, isp: null };
  }
}

export default { getClientIp, lookupIpInfo };

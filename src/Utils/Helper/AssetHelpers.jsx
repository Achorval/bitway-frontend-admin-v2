
import request from "./Request";
  
/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function getAdminByToken(accessToken) {
  return request(`${process.env.REACT_APP_API_URL}/admin/verifyToken`, { 
    method: 'POST', 
    body: {
      accessToken: accessToken
    }
  })
};
 
/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function FormatBalance(number) {
  return number.toFixed(2);
};

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function FormatNumbers(amount) {
  return amount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export const RenderStatus = (value) => {
  let badgeClassName = '';
  switch (value) {
    case 'Successful':
      badgeClassName = 'badge-success';
      break;
    case 'Pending':
      badgeClassName = 'badge-warning';
      break;
    case 'Processing':
      badgeClassName = 'badge-primary';
      break;
    case 'Failed':
      badgeClassName = 'badge-danger';
      break;
    case 'Rejected':
      badgeClassName = 'badge-info';
      break;
    default:
      break;
  }
  return <span className={`badge rounded-pill pill-badge-success ${badgeClassName}`}>{value}</span>;
}; 
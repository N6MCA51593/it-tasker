export default function getApiUrl(url) {
  return process.env.NODE_ENV === 'production'
    ? `api/${url}`
    : `http://localhost:5000/api/${url}`;
}

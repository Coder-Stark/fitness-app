export function getErrorMessage(error) {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.request) return "Cannot reach the server. Please try again.";
  return "Something went wrong. Please try again.";
}
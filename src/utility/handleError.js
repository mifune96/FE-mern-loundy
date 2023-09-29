export default function errorHandler(error) {
  if (error) {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.clear()
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  }
}

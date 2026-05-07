import api from './api.js'

const reviewService = {

  // GET ALL REVIEWS
  getAll: params =>
    api.get(
      '/reviews',
      { params }
    ),

  // GET SINGLE REVIEW
  getById: id =>
    api.get(
      `/reviews/${id}`
    ),

  // APPROVE REVIEW
  approve: (
    id,
    payload = {}
  ) =>
    api.post(
      `/reviews/${id}/approve`,
      payload
    ),

  // REJECT REVIEW
  reject: (
    id,
    payload = {}
  ) =>
    api.post(
      `/reviews/${id}/reject`,
      payload
    ),

  // UPDATE REVIEW
  update: (
    id,
    payload
  ) =>
    api.put(
      `/reviews/${id}`,
      payload
    ),

  // FILE UPLOAD
  upload: formData =>
    api.post(
      '/reviews/upload',
      formData,
      {
        headers: {
          'Content-Type':
            'multipart/form-data',
        },
      }
    ),

  // REVIEW STATS
  getStats: () =>
    api.get(
      '/reviews/stats'
    ),

  // GET PDF ANNOTATIONS
  getAnnotations: reviewId =>
    api.get(
      `/reviews/annotations/${reviewId}`
    ),

  // CREATE PDF ANNOTATION
  createAnnotation: (
    reviewId,
    payload
  ) =>
    api.post(
      `/reviews/annotations/${reviewId}`,
      payload
    ),
}

export default reviewService
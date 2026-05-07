import api from './api.js'

const annotationService = {

  // GET ALL ANNOTATIONS FOR REVIEW
  getByReview: (reviewId) =>
    api.get(
      `/reviews/annotations/${reviewId}`
    ),

  // CREATE ANNOTATION
  create: (
    reviewId,
    payload
  ) =>
    api.post(
      `/reviews/annotations/${reviewId}`,
      payload
    ),

  // OPTIONAL FUTURE SUPPORT
  update: (
    id,
    data
  ) =>
    api.put(
      `/annotations/${id}`,
      data
    ),

  delete: (id) =>
    api.delete(
      `/annotations/${id}`
    ),
}

export default annotationService
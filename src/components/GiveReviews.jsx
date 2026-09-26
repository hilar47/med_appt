import React, { useState } from 'react'
import { submitReview } from '../api/api.js'
import { useNotification } from '../context/NotificationContext.jsx'

const RATINGS = [1, 2, 3, 4, 5]

/**
 * Lets a patient rate and review a doctor after a visit. Once the review is
 * submitted successfully, the form is disabled so it can't be posted twice
 * (Task 11's post-submission disabling behaviour).
 */
function GiveReviews({ doctor }) {
  const { notify } = useNotification()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (submitted) return

    if (rating === 0) {
      setError('Please select a star rating.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      await submitReview({ doctorId: doctor?.id, rating, comment })
      setSubmitted(true)
      notify('Thanks — your review has been posted.', 'success')
    } catch (err) {
      notify(err.message || 'Could not submit your review. Please try again.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="panel" onSubmit={handleSubmit} noValidate>
      <h3>Rate your visit{doctor ? ` with ${doctor.name}` : ''}</h3>

      <div className="field" role="radiogroup" aria-label="Rating out of 5 stars">
        <label>Rating</label>
        <div className="star-rating">
          {RATINGS.map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={`${value} star${value > 1 ? 's' : ''}`}
              className={`star-rating__star ${value <= rating ? 'is-filled' : ''}`}
              onClick={() => !submitted && setRating(value)}
              disabled={submitted}
            >
              ★
            </button>
          ))}
        </div>
        {error && <span className="field-error">{error}</span>}
      </div>

      <div className="field">
        <label htmlFor="review-comment">Comment (optional)</label>
        <textarea
          id="review-comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={submitted}
          placeholder="What went well, and what could be better?"
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={submitting || submitted}>
        {submitted ? 'Review submitted' : submitting ? 'Submitting…' : 'Submit review'}
      </button>

      {submitted && <p className="field-hint">You've already reviewed this appointment.</p>}
    </form>
  )
}

export default GiveReviews

import React, { useState } from 'react'
import annotationService from '../../services/annotationService.js'

export default function AnnotationLayer({

  reviewId,
  annotations = [],
  onAdd,

}) {

  const [text, setText] =
    useState('')

  const [saving, setSaving] =
    useState(false)

  const handleAdd = async () => {

    if (!text.trim()) {
      return
    }

    setSaving(true)

    try {

      const payload = {

        fieldName: 'GENERAL_NOTE',

        pageNumber: 1,

        x: 0,

        y: 0,

        width: 0,

        height: 0,

        text: text,
      }

      const annotation =
        await annotationService.create(
          reviewId,
          payload
        )

      onAdd?.(annotation)

      setText('')

    } catch (err) {

      console.error(
        'Failed to create annotation',
        err
      )

    } finally {

      setSaving(false)
    }
  }

  return (

    <div
      style={{
        padding: '16px',
        borderTop:
          '1px solid rgba(201,168,76,0.1)',
      }}
    >

      <div className="form-group">

        <label className="form-label">
          Add Annotation
        </label>

        <textarea
          className="form-input"
          rows={2}
          value={text}
          onChange={e =>
            setText(e.target.value)
          }
          placeholder="Type your annotation..."
          style={{
            resize: 'none',
          }}
        />

      </div>

      <button
        className="action-btn btn-edit"
        onClick={handleAdd}
        disabled={saving}
      >

        {
          saving
            ? 'Saving…'
            : '+ Add'
        }

      </button>

      {
        annotations.map((a, i) => (

          <div
            key={i}
            style={{
              marginTop: 12,
              padding: '8px 12px',
              background:
                'rgba(201,168,76,0.06)',
              border:
                '1px solid rgba(201,168,76,0.12)',
              fontSize: 12,
              color:
                'var(--silver-light)',
            }}
          >

            {
              a.text ||
              a.fieldName ||
              'Annotation'
            }

            <div
              style={{
                marginTop: 4,
                fontSize: 10,
                color: 'var(--silver)',
              }}
            >

              {
                a.createdAt ||
                'Saved'
              }

            </div>

          </div>
        ))
      }

    </div>
  )
}
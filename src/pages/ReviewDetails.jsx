import React, {
  useState,
  useEffect,
} from 'react'

import {
  useParams,
  useNavigate,
} from 'react-router-dom'

import {
  Document,
  Page,
  pdfjs,
} from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import reviewService from '../services/reviewService.js'

import ReviewStatusBadge from '../components/review/ReviewStatusBadge.jsx'
import ReviewActions from '../components/review/ReviewActions.jsx'
import ConfidenceBadge from '../components/review/ConfidenceBadge.jsx'
import TimelineCard from '../components/review/TimelineCard.jsx'
import FieldEditor from '../components/review/FieldEditor.jsx'
import PdfHighlights from '../components/pdf/PdfHighlights.jsx'
import AnnotationLayer from '../components/pdf/AnnotationLayer.jsx'
import Loader from '../components/common/Loader.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'

import {
  formatDate,
} from '../utils/formatDate.js'

// PDF WORKER

pdfjs.GlobalWorkerOptions.workerSrc =
  new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
  ).toString()

const MOCK_FIELDS = [
  {
    key: 'article',
    icon: '⚖️',
    label: 'Constitutional Article',
  },

  {
    key: 'department',
    icon: '🏛️',
    label: 'Responsible Department',
  },

  {
    key: 'deadline',
    icon: '📅',
    label: 'Compliance Deadline',
  },

  {
    key: 'docType',
    icon: '📋',
    label: 'Document Type',
  },
]

export default function ReviewDetails() {

  const { id } =
    useParams()

  const navigate =
    useNavigate()

  const [review, setReview] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  const [annotations, setAnnotations] =
    useState([])

  const [highlights, setHighlights] =
    useState([])

  const [editMode, setEditMode] =
    useState(false)

  const [editedFields, setEditedFields] =
    useState({})

  const [numPages, setNumPages] =
    useState(null)

  useEffect(() => {

    setLoading(true)

    setError('')

    reviewService
      .getById(id)

      .then(async res => {

        const data =
          res?.data || res

        setReview(data)

        // LOAD ANNOTATIONS

        try {

          const annotationRes =
            await reviewService
              .getAnnotations(id)

          setAnnotations(
            annotationRes?.data ||
            annotationRes ||
            []
          )

        } catch {

          setAnnotations([])
        }

        // LOAD REAL DB HIGHLIGHTS

        try {

          const highlightsRes =
            await fetch(
              `http://localhost:8083/highlights/${data.caseEntity?.id}`
            )

          const highlightData =
            await highlightsRes.json()

          setHighlights(
            highlightData || []
          )

        } catch {

          setHighlights([])
        }

      })

      .catch(err => {

        console.error(err)

        setError(
          err?.response?.data?.message ||
          err?.message ||
          'Failed to load review'
        )
      })

      .finally(() => {

        setLoading(false)
      })

  }, [id])

  const handleDone = action => {

    if (action === 'edit') {

      setEditMode(true)

      return
    }

    navigate('/reviews')
  }

  if (loading) {

    return <Loader />
  }

  if (!review) {

    return (
      <div className="page-body">
        <ErrorAlert
          message="Review not found"
        />
      </div>
    )
  }

  const r = review

  const caseId =
    r.caseEntity?.id

  const caseNumber =
    r.caseEntity?.caseNumber

  const pdfUrl =
    caseId
      ? `http://localhost:8083/cases/${caseId}/pdf`
      : null

  return (
    <>
      <div className="page-header">

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >

          <h1
            className="page-title"
            style={{
              marginBottom: 0,
            }}
          >

            {
              caseNumber ||
              'Unknown Case'
            }

          </h1>

          <ReviewStatusBadge
            status={r.status}
          />

          {
            r.confidenceScore != null && (
              <ConfidenceBadge
                score={
                  r.confidenceScore
                }
              />
            )
          }

        </div>

        <p className="page-subtitle">

          {
            r.title ||
            r.fileName ||
            'Review Task'
          }

          {' · '}

          {r.department}

          {' · '}

          {
            formatDate(
              r.createdAt
            )
          }

        </p>

      </div>

      <div className="page-body">

        <ErrorAlert
          message={error}
        />

        <div
          className="verify-grid"
          style={{
            marginBottom: 24,
          }}
        >

          {/* PDF PANEL */}

          <div className="pdf-viewer-mock">

            <div className="pdf-header">

              <span className="pdf-title">

                {
                  caseNumber
                }

                {' · Source Document'}

              </span>

              <span
                style={{
                  fontSize: 10,
                  color:
                    'var(--silver)',
                  fontFamily:
                    'Cinzel, serif',
                  letterSpacing: 1,
                }}
              >

                {
                  numPages
                    ? `Pages: ${numPages}`
                    : 'Loading PDF...'
                }

              </span>

            </div>

            {/* SCROLLABLE PDF BODY */}

            <div
              className="pdf-body"
              style={{

                overflowY: 'auto',

                maxHeight: '85vh',

                paddingRight: 8,

                scrollbarWidth: 'thin',
              }}
            >

              {
                pdfUrl ? (

                  <Document

                    file={{
                      url: pdfUrl,
                      withCredentials: false,
                    }}

                    onLoadSuccess={({
                      numPages,
                    }) =>
                      setNumPages(
                        numPages
                      )
                    }

                    loading={
                      <Loader />
                    }

                    error={
                      <ErrorAlert
                        message="Failed to load PDF"
                      />
                    }

                    options={{
                      standardFontDataUrl:
                        'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
                    }}
                  >

                    {
                      Array.from(
                        new Array(numPages || 0),
                        (_, index) => (
                          <div
                            key={`page_${index + 1}`}
                            style={{
                              marginBottom: 24,
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >

                            <Page
                              pageNumber={index + 1}
                              width={650}
                            />

                          </div>
                        )
                      )
                    }

                  </Document>

                ) : (

                  <ErrorAlert
                    message="No PDF linked to this review"
                  />

                )
              }

              {/* REAL DB HIGHLIGHTS */}

              <div
                style={{
                  marginTop: 24,
                }}
              >

                <PdfHighlights
                  highlights={highlights}
                />

              </div>

              {
                r.summary && (
                  <div
                    style={{
                      marginTop: 18,
                      lineHeight: 1.7,
                      fontSize: 13,
                      color:
                        'var(--silver-light)',
                    }}
                  >
                    {r.summary}
                  </div>
                )
              }

            </div>

            <AnnotationLayer
              reviewId={id}
              annotations={
                annotations
              }
              onAdd={a =>
                setAnnotations(
                  prev => [
                    ...prev,
                    a,
                  ]
                )
              }
            />

          </div>

          {/* RIGHT PANEL */}

          <div className="action-panel">

            <div className="action-card">

              <div className="action-header">

                <span className="action-icon">
                  📄
                </span>

                <span className="action-title">
                  Extracted Fields
                </span>

              </div>

              {
                editMode ? (

                  <FieldEditor
                    fields={
                      MOCK_FIELDS
                    }
                    onChange={
                      setEditedFields
                    }
                  />

                ) : (

                  <div className="field-list">

                    <div className="field-item">

                      <span className="field-icon">
                        📌
                      </span>

                      <div className="field-info">

                        <div className="field-label">
                          Title
                        </div>

                        <div className="field-value">

                          {
                            editedFields.title ||
                            r.title ||
                            '—'
                          }

                        </div>

                      </div>

                    </div>

                    <div className="field-item">

                      <span className="field-icon">
                        🏛️
                      </span>

                      <div className="field-info">

                        <div className="field-label">
                          Department
                        </div>

                        <div className="field-value">

                          {
                            editedFields.department ||
                            r.department ||
                            '—'
                          }

                        </div>

                      </div>

                    </div>

                    <div className="field-item">

                      <span className="field-icon">
                        ⚡
                      </span>

                      <div className="field-info">

                        <div className="field-label">
                          Priority
                        </div>

                        <div className="field-value">

                          {
                            editedFields.priority ||
                            r.priority ||
                            '—'
                          }

                        </div>

                      </div>

                    </div>

                    <div className="field-item">

                      <span className="field-icon">
                        📅
                      </span>

                      <div className="field-info">

                        <div className="field-label">
                          Due Date
                        </div>

                        <div className="field-value">

                          {
                            r.dueDate
                              ? formatDate(
                                  r.dueDate
                                )
                              : '—'
                          }

                        </div>

                      </div>

                    </div>

                  </div>
                )
              }

            </div>

            <div className="action-card">

              <div className="action-header">

                <span className="action-icon">
                  🧠
                </span>

                <span className="action-title">
                  Review Actions
                </span>

              </div>

              <ReviewActions
                reviewId={id}
                onDone={
                  handleDone
                }
              />

            </div>

          </div>

        </div>

        <div className="dash-panel">

          <div className="panel-header">

            <span className="panel-title">
              Case Timeline
            </span>

          </div>

          <TimelineCard
            events={[
              {
                timestamp:
                  r.createdAt,

                action:
                  'Review Task Created',

                user:
                  r.assignedTo,

                note:
                  r.status,
              },
            ]}
          />

        </div>

      </div>
    </>
  )
}
import React from 'react'

const TYPE_CLASS = {

  directive:
    'highlight-gold',

  department:
    'highlight-jade',

  article:
    'highlight-saffron',

  deadline:
    'highlight-crimson',

  compliance:
    'highlight-blue',
}

function getOpacity(
  confidence
) {

  if (
    confidence == null
  ) {

    return 0.75
  }

  if (
    confidence >= 0.9
  ) {

    return 1
  }

  if (
    confidence >= 0.7
  ) {

    return 0.85
  }

  if (
    confidence >= 0.5
  ) {

    return 0.7
  }

  return 0.5
}

export default function PdfHighlights({

  text = '',

  highlights = [],

}) {

  // EMPTY STATE

  if (
    !highlights.length
  ) {

    return (
      <p
        className="pdf-body"
        style={{
          padding: 0,
          lineHeight: 1.9,
          fontSize: 13,
          color:
            'var(--silver-light)',
          fontFamily:
            'Cormorant Garamond, serif',
        }}
      >
        {text}
      </p>
    )
  }

  return (

    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        lineHeight: 2,
      }}
    >

      {
        highlights.map((h, i) => {

          const opacity =
            getOpacity(
              h.confidence
            )

          return (

            <span
              key={i}

              className={
                `highlight ${
                  TYPE_CLASS[
                    h.type
                  ] ||
                  'highlight-gold'
                }`
              }

              title={
                `${h.label || h.type}
Confidence: ${
                  h.confidence != null
                    ? (
                        h.confidence * 100
                      ).toFixed(1)
                    : 'N/A'
                }%`
              }

              style={{

                opacity,

                padding:
                  '4px 10px',

                borderRadius:
                  8,

                fontSize:
                  12,

                cursor:
                  'pointer',

                transition:
                  'all 0.2s ease',

                border:
                  '1px solid rgba(255,255,255,0.08)',

                backdropFilter:
                  'blur(4px)',
              }}

            >

              {/* LABEL */}

              <span
                style={{
                  fontWeight: 700,
                  marginRight: 6,
                }}
              >
                {
                  h.label ||
                  h.type
                }
                :
              </span>

              {/* TEXT */}

              <span>
                {
                  h.text
                }
              </span>

              {/* CONFIDENCE */}

              {
                h.confidence != null && (

                  <span
                    style={{
                      marginLeft: 8,
                      fontSize: 10,
                      opacity: 0.8,
                    }}
                  >
                    (
                    {
                      (
                        h.confidence * 100
                      ).toFixed(0)
                    }
                    %)
                  </span>

                )
              }

            </span>
          )
        })
      }

    </div>
  )
}
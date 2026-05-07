import React, { useState } from 'react'
import PageNavigator from './PageNavigator.jsx'

export default function PdfViewer({ url, highlights = [] }) {
  const [page, setPage] = useState(1)
  const [totalPages] = useState(1)

  if (!url) {
    return (
      <div className="pdf-viewer-mock" style={{ minHeight: 300 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, color: 'var(--silver)', fontSize: 13 }}>
          No document loaded
        </div>
      </div>
    )
  }

  return (
    <div className="pdf-viewer-mock">
      <div className="pdf-header">
        <span className="pdf-title">Document Preview</span>
        <PageNavigator page={page} total={totalPages} onChange={setPage} />
      </div>
      <div className="pdf-body">
        <iframe
          src={`${url}#page=${page}`}
          title="PDF Preview"
          style={{ width: '100%', minHeight: 500, border: 'none', background: 'transparent' }}
        />
      </div>
    </div>
  )
}

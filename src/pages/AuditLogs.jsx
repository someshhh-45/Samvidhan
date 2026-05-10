import React, { useState, useEffect } from 'react'

import auditService from '../services/auditService.js'

import SearchBar from '../components/common/SearchBar.jsx'
import Pagination from '../components/common/Pagination.jsx'
import Loader from '../components/common/Loader.jsx'
import EmptyState from '../components/common/EmptyState.jsx'

import { formatDateTime } from '../utils/formatDate.js'

const ACTION_COLORS = {

  LOGIN: 'var(--silver)',

  LOGOUT: 'var(--silver-light)',

  CREATE_REVIEW: 'var(--gold)',

  ASSIGN_REVIEWER: 'var(--saffron)',

  VERIFY_REVIEW: 'var(--jade-light)',

  REJECT_REVIEW: '#E74C3C',

  CASE_CREATED: 'var(--gold)',

  CASE_UPDATED: 'var(--silver-light)',

  CASE_APPROVED: 'var(--jade-light)',

  CASE_REJECTED: '#E74C3C',

  REVIEW_COMPLETED: 'var(--jade-light)',

  NOTIFICATION_SENT: 'var(--saffron)',
}

export default function AuditLogs() {

  const [logs, setLogs] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState('')

  const [page, setPage] =
    useState(1)

  const [total, setTotal] =
    useState(0)

  useEffect(() => {

    fetchLogs()

  }, [page, search])

  const fetchLogs = async () => {

    try {

      const data =
        await auditService.getLogs()

      console.log(data)

      const filteredLogs =

        Array.isArray(data)

          ? data.filter(log =>

              !search ||

              log.action
                ?.toLowerCase()
                .includes(
                  search.toLowerCase()
                )

              ||

              log.performedBy
                ?.toLowerCase()
                .includes(
                  search.toLowerCase()
                )

              ||

              log.details
                ?.toLowerCase()
                .includes(
                  search.toLowerCase()
                )
            )

          : []

      setLogs(filteredLogs)

      setTotal(filteredLogs.length)

    } catch(error) {

      console.error(
        'Audit Logs Error:',
        error
      )

      setLogs([])

      setTotal(0)

    } finally {

      setLoading(false)
    }
  }

  const display = logs

  return (

    <>
      <div className="page-header">

        <h1 className="page-title">

          Audit <em>Logs</em>

        </h1>

        <p className="page-subtitle">

          Immutable record of all
          platform actions,
          logins,
          and state changes

        </p>

      </div>

      <div className="page-body">

        <div
          style={{
            display: 'flex',
            gap: 12,
            marginBottom: 20,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >

          <div
            style={{
              flex: 1,
              maxWidth: 400
            }}
          >

            <SearchBar

              placeholder="
                Search by user
                or action…
              "

              value={search}

              onChange={setSearch}
            />

          </div>

          <button

  className="
    action-btn
    btn-edit
  "

  onClick={
    auditService.exportCsv
  }

  style={{
    fontFamily:
      'Cinzel, serif',

    fontSize: 10,

    padding: '8px 20px'
  }}
>

  Export CSV

</button>

        </div>

        <div className="dash-panel">

          <div className="panel-header">

            <span className="panel-title">

              Activity Log

            </span>

            <span className="panel-badge">

              {total} Entries

            </span>

          </div>

          {
            loading ? (

              <Loader />

            ) : display.length === 0 ? (

              <EmptyState

                icon="🗂️"

                title="
                  No audit records
                "

                desc="
                  No activity
                  matching your
                  search.
                "
              />

            ) : (

              <div
                style={{
                  padding: '0 20px'
                }}
              >

                <div
                  style={{
                    display: 'grid',

                    gridTemplateColumns:
                      '160px 180px 1fr 180px',

                    gap: 12,

                    padding: '10px 0',

                    borderBottom:
                      '1px solid rgba(255,255,255,0.06)'
                  }}
                >

                  {
                    [
                      'Timestamp',

                      'Action',

                      'Details',

                      'Performed By'
                    ].map(h => (

                      <span
                        key={h}
                        style={{
                          fontFamily:
                            'Cinzel, serif',

                          fontSize: 8,

                          letterSpacing: 2,

                          color:
                            'var(--silver)',

                          textTransform:
                            'uppercase'
                        }}
                      >

                        {h}

                      </span>
                    ))
                  }

                </div>

                {
                  display.map(log => (

                    <div

                      key={log.id}

                      style={{

                        display: 'grid',

                        gridTemplateColumns:
                          '160px 180px 1fr 180px',

                        gap: 12,

                        padding: '12px 0',

                        borderBottom:
                          '1px solid rgba(255,255,255,0.04)',

                        alignItems: 'center'
                      }}
                    >

                      <span
                        style={{
                          fontFamily:
                            'Cinzel, serif',

                          fontSize: 9,

                          color:
                            'var(--gold)',

                          letterSpacing: 0.5
                        }}
                      >

                        {
                          formatDateTime(
                            log.timestamp
                          )
                        }

                      </span>

                      <span
                        style={{
                          fontSize: 10,

                          color:
                            ACTION_COLORS[
                              log.action
                            ]
                            ||
                            'var(--silver-light)',

                          fontFamily:
                            'Cinzel, serif',

                          letterSpacing: 1
                        }}
                      >

                        {log.action}

                      </span>

                      <span
                        style={{
                          fontSize: 12,

                          color:
                            'var(--cream)'
                        }}
                      >

                        {log.details}

                      </span>

                      <span
                        style={{
                          fontSize: 11,

                          color:
                            'var(--silver-light)'
                        }}
                      >

                        {log.performedBy}

                      </span>

                    </div>
                  ))
                }

              </div>
            )
          }

        </div>

        <Pagination

          page={page}

          total={total}

          pageSize={20}

          onChange={setPage}
        />

      </div>
    </>
  )
}
'use client';

import React, { useState, useId } from 'react';
import { ExampleMonitorFrame } from './ExampleDeviceFrames';
import styles from './ExampleDemos.module.css';

type CrmStatus = 'New' | 'Visit planned' | 'Done';
type CrmView = 'Requests' | 'Schedule' | 'Customers';

interface CrmRecord {
  id: string;
  name: string;
  job: string;
  status: CrmStatus;
  area: string;
  requested: string;
  preferred: string;
  note: string;
  technician: string;
  history: string[];
}

const RAW_INITIAL_RECORDS: [string, string, CrmStatus, string, string, string, string][] = [
  ['Anita', 'Tap repair', 'New', 'North', 'Today', 'Saturday morning', 'Kitchen tap drips through the night.'],
  ['Ravi', 'Wiring check', 'Visit planned', 'East', 'Yesterday', 'Monday afternoon', 'Check wiring near the hallway.'],
  ['Meena', 'Wall painting', 'Done', 'South', '3 days ago', 'Sunday morning', 'Small interior touch-up.'],
  ['Farhan', 'Switch replacement', 'New', 'West', 'Today', 'Saturday afternoon', 'One switch is loose.'],
  ['Lakshmi', 'Drain cleaning', 'Visit planned', 'Central', 'Yesterday', 'Sunday afternoon', 'Kitchen drain runs slowly.'],
  ['Joseph', 'Ceiling fan fitting', 'Visit planned', 'North', '2 days ago', 'Monday morning', 'Fan fitting in living room.'],
  ['Sunita', 'Door painting', 'Done', 'East', '4 days ago', 'Saturday morning', 'Door needs one fresh coat.'],
  ['Imran', 'Pipe leak', 'New', 'South', 'Today', 'Sunday morning', 'Pipe leaks under sink.'],
  ['Kavya', 'Light fitting', 'Done', 'West', '5 days ago', 'Monday afternoon', 'Bedroom light fitting.'],
  ['Arjun', 'Bathroom tap fitting', 'Visit planned', 'Central', '2 days ago', 'Saturday evening', 'Replacement tap fitting.'],
];

function createInitialRecords(): CrmRecord[] {
  return RAW_INITIAL_RECORDS.map((r, i) => ({
    id: `EXAMPLE-${String(i + 1).padStart(3, '0')}`,
    name: r[0],
    job: r[1],
    status: r[2],
    area: r[3],
    requested: r[4],
    preferred: r[5],
    note: r[6],
    technician: 'Not assigned',
    history: [
      'Request received',
      ...(r[2] === 'Visit planned' || r[2] === 'Done' ? ['Visit agreed'] : []),
      ...(r[2] === 'Done' ? ['Job done'] : []),
    ],
  }));
}

function StatusChip({ status }: { status: CrmStatus }) {
  let badgeClass = styles.pBadgeNew;
  if (status === 'Visit planned') badgeClass = styles.pBadgePlan;
  if (status === 'Done') badgeClass = styles.pBadgeDone;

  return (
    <span className={`${styles.pChip} ${badgeClass}`}>
      <span className={styles.pStatusDot} aria-hidden="true" />
      <span>{status === 'Visit planned' ? 'Visit planned' : status}</span>
    </span>
  );
}

export function ExampleCrmAdmin() {
  const [records, setRecords] = useState<CrmRecord[]>(createInitialRecords);
  const [currentView, setCurrentView] = useState<CrmView>('Requests');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [changeNotice, setChangeNotice] = useState<string>('');

  const searchInputId = useId();
  const filterSelectId = useId();

  const handleReset = () => {
    setRecords(createInitialRecords());
    setCurrentView('Requests');
    setSelectedIndex(0);
    setSearchQuery('');
    setStatusFilter('All');
    setChangeNotice('');
  };

  const handleStatusChange = (newStatus: CrmStatus) => {
    const target = records[selectedIndex];
    if (!target) return;

    const updatedHistory = [...target.history];
    if (newStatus === 'Visit planned' && !updatedHistory.includes('Visit agreed')) {
      updatedHistory.push('Visit agreed');
    }
    if (newStatus === 'Done' && !updatedHistory.includes('Job done')) {
      updatedHistory.push('Job done');
    }

    const updatedRecords = records.map((r, i) =>
      i === selectedIndex
        ? { ...r, status: newStatus, history: updatedHistory }
        : r
    );

    setRecords(updatedRecords);
    setChangeNotice(`Status updated to ${newStatus}. Nothing is saved.`);
  };

  const handleTechChange = (newTech: string) => {
    const updatedRecords = records.map((r, i) =>
      i === selectedIndex ? { ...r, technician: newTech } : r
    );
    setRecords(updatedRecords);
    setChangeNotice(`Technician assigned to ${newTech}. Nothing is saved.`);
  };

  // Filtered rows for Requests table
  const filteredRecords = records
    .map((r, i) => ({ ...r, _originalIndex: i }))
    .filter((r) => {
      const matchesFilter = statusFilter === 'All' || r.status === statusFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.job.toLowerCase().includes(q) ||
        r.area.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });

  const selectedRecord = records[selectedIndex] || records[0];

  const countNew = records.filter((r) => r.status === 'New').length;
  const countPlanned = records.filter((r) => r.status === 'Visit planned').length;
  const countDone = records.filter((r) => r.status === 'Done').length;

  const navViews: CrmView[] = ['Requests', 'Schedule', 'Customers'];

  return (
    <ExampleMonitorFrame>
      <div className={styles.crmUi}>
        {/* Desktop Sidebar */}
        <aside className={styles.crmSidebar}>
          <strong>
            Example Home Repairs
            <br />
            <small style={{ opacity: 0.65 }}>Admin</small>
          </strong>
          {navViews.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setCurrentView(v)}
              aria-pressed={currentView === v}
            >
              {v}
            </button>
          ))}
        </aside>

        {/* Mobile View Selector */}
        <nav className={styles.crmMobileNav} aria-label="Example admin views">
          {navViews.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setCurrentView(v)}
              aria-pressed={currentView === v}
            >
              {v}
            </button>
          ))}
        </nav>

        {/* Work Area */}
        <div className={styles.crmWork}>
          {/* Top Bar */}
          <div className={styles.crmTop}>
            <div>
              <h2>{currentView}</h2>
              <small>Sample records. Nothing is saved.</small>
            </div>
            <button
              type="button"
              className={styles.pSecondary}
              onClick={handleReset}
            >
              Reset sample records
            </button>
          </div>

          {/* Summary Metric Counters */}
          <div className={styles.crmSummary}>
            <div className={styles.crmCount}>
              <small>New</small>
              <strong>{countNew}</strong>
            </div>
            <div className={styles.crmCount}>
              <small>Visits planned</small>
              <strong>{countPlanned}</strong>
            </div>
            <div className={styles.crmCount}>
              <small>Done</small>
              <strong>{countDone}</strong>
            </div>
          </div>

          {/* View: Requests */}
          {currentView === 'Requests' && (
            <>
              {/* Toolbar */}
              <div className={styles.crmToolbar}>
                <label htmlFor={searchInputId} style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
                  Search by customer, job or area
                </label>
                <input
                  id={searchInputId}
                  className={styles.pInput}
                  placeholder="Search by customer, job or area"
                  aria-label="Search by customer, job or area"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                />

                <label htmlFor={filterSelectId} style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
                  Filter status
                </label>
                <select
                  id={filterSelectId}
                  className={styles.pSelect}
                  aria-label="Filter status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="New">New</option>
                  <option value="Visit planned">Visit planned</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              {/* Content Grid: Table + Detail Panel */}
              <div className={styles.crmContent}>
                <div className={styles.crmList}>
                  <table className={styles.crmTable}>
                    <thead>
                      <tr>
                        <th scope="col">Customer</th>
                        <th scope="col">Job</th>
                        <th scope="col">Area</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRecords.length > 0 ? (
                        filteredRecords.map((r) => {
                          const isRowSelected = r._originalIndex === selectedIndex;
                          return (
                            <tr
                              key={r.id}
                              className={isRowSelected ? styles.selected : ''}
                              style={isRowSelected ? { backgroundColor: '#eef7ff' } : undefined}
                            >
                              <td>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedIndex(r._originalIndex);
                                    setChangeNotice('');
                                  }}
                                  aria-pressed={isRowSelected}
                                >
                                  {r.name}
                                </button>
                              </td>
                              <td>{r.job}</td>
                              <td>{r.area}</td>
                              <td>
                                <StatusChip status={r.status} />
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={4} className={styles.crmEmpty}>
                            No requests match.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Right Detail Panel */}
                <aside className={styles.crmDetail} aria-label="Request detail inspection">
                  <h3>Request details</h3>
                  <span className={styles.pChip}>{selectedRecord.id}</span>
                  <dl>
                    <div>
                      <dt>Customer</dt>
                      <dd>{selectedRecord.name}</dd>
                    </div>
                    <div>
                      <dt>Job</dt>
                      <dd>{selectedRecord.job}</dd>
                    </div>
                    <div>
                      <dt>Area</dt>
                      <dd>{selectedRecord.area}</dd>
                    </div>
                    <div>
                      <dt>Preferred time</dt>
                      <dd>{selectedRecord.preferred}</dd>
                    </div>
                  </dl>

                  <div className={styles.crmStack}>
                    <label>
                      <span className={styles.pFieldLabel}>Change status</span>
                      <select
                        className={styles.pSelect}
                        value={selectedRecord.status}
                        onChange={(e) => handleStatusChange(e.target.value as CrmStatus)}
                        aria-label="Change status"
                      >
                        <option value="New">New</option>
                        <option value="Visit planned">Visit planned</option>
                        <option value="Done">Done</option>
                      </select>
                    </label>

                    <label>
                      <span className={styles.pFieldLabel}>Assign technician</span>
                      <select
                        className={styles.pSelect}
                        value={selectedRecord.technician}
                        onChange={(e) => handleTechChange(e.target.value)}
                        aria-label="Assign technician"
                      >
                        <option value="Not assigned">Not assigned</option>
                        <option value="Suresh">Suresh</option>
                        <option value="Deepak">Deepak</option>
                      </select>
                    </label>
                  </div>

                  <h4>Notes</h4>
                  <p>{selectedRecord.note}</p>

                  <h4>History</h4>
                  <ol className={styles.crmHistory}>
                    {selectedRecord.history.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ol>

                  {changeNotice && (
                    <div className={styles.crmChange} role="status">
                      {changeNotice}
                    </div>
                  )}
                </aside>
              </div>
            </>
          )}

          {/* View: Schedule */}
          {currentView === 'Schedule' && (
            <div className={styles.crmContent}>
              <div className={styles.crmSchedule}>
                <h3 style={{ fontSize: '17px', margin: '0 0 12px' }}>Planned visits</h3>
                <div className={styles.crmScheduleList}>
                  {records.filter((r) => r.status === 'Visit planned').length > 0 ? (
                    records
                      .filter((r) => r.status === 'Visit planned')
                      .map((r) => (
                        <div key={r.id} className={styles.crmScheduleItem}>
                          <div>
                            <b>
                              {r.name} · {r.job}
                            </b>
                            <br />
                            <span className={styles.pMuted}>
                              {r.area} · {r.preferred}
                            </span>
                          </div>
                          <StatusChip status={r.status} />
                        </div>
                      ))
                  ) : (
                    <p className={styles.pMuted}>No visits planned.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* View: Customers */}
          {currentView === 'Customers' && (
            <div className={styles.crmContent}>
              <div className={styles.crmCustomers}>
                <h3 style={{ fontSize: '17px', margin: '0 0 12px' }}>Customers</h3>
                <div className={styles.crmScheduleList}>
                  {records.map((r) => (
                    <div key={r.id} className={styles.crmScheduleItem}>
                      <div>
                        <b>{r.name}</b>
                        <br />
                        <span className={styles.pMuted}>
                          {r.job} · {r.area}
                        </span>
                      </div>
                      <StatusChip status={r.status} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ExampleMonitorFrame>
  );
}

// Inside your Admin Dashboard
<div className="mt-5">
  <h3 className="fw-bold mb-4">Incoming Leads</h3>
  <div className="card border-0 shadow-sm rounded-4">
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light text-muted small">
          <tr>
            <th className="px-4 py-3">CLIENT</th>
            <th>REQUEST TYPE</th>
            <th>LOCATION</th>
            <th>STATUS</th>
            <th className="text-end px-4">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {/* Example Lead Row */}
          <tr>
            <td className="px-4">
              <div className="fw-bold">John Doe</div>
              <div className="small text-muted">+234-803-XXXX</div>
            </td>
            <td><span className="badge bg-info-subtle text-info">Buyer Verification</span></td>
            <td>Maitama Extension</td>
            <td><span className="badge bg-warning text-dark">Pending</span></td>
            <td className="text-end px-4">
              <button className="btn btn-sm btn-success rounded-pill px-3">WhatsApp Client</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
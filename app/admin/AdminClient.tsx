"use client";

type Lead = {
  id: string;
  name: string;
  phone: string;
  type: string;
  location?: string | null;
  status: string;
};

export default function AdminClient({ leads }: { leads: Lead[] }) {
  return (
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
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-4">
                    <div className="fw-bold">{lead.name}</div>
                    <div className="small text-muted">{lead.phone}</div>
                  </td>

                  <td>
                    <span className="badge bg-info-subtle text-info">
                      {lead.type}
                    </span>
                  </td>

                  <td>{lead.location || "N/A"}</td>

                  <td>
                    <span className="badge bg-warning text-dark">
                      {lead.status}
                    </span>
                  </td>

                  <td className="text-end px-4">
                    <a
                      href={`https://wa.me/${lead.phone}`}
                      target="_blank"
                      className="btn btn-sm btn-success rounded-pill px-3"
                    >
                      WhatsApp Client
                    </a>
                  </td>
                </tr>
              ))}

              {leads.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-muted">
                    No leads yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
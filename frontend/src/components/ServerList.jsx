import React from 'react';
import api from '../api';
import { Trash2 } from 'lucide-react';

const ServerList = ({ servers, setServers }) => {
    const deleteServer = async (id) => {
        if (!window.confirm("Are you sure you want to delete this server?")) return;
        try {
            await api.delete(`/servers/${id}`);
            setServers(servers.filter(server => server.id !== id));
        } catch (error) {
            console.error("Error deleting server:", error);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'active':
                return <span className="status-badge status-active">Active</span>;
            case 'stopped':
                return <span className="status-badge status-stopped">Stopped</span>;
            case 'maintenance':
                return <span className="status-badge status-maintenance">Maintenance</span>;
            default:
                return <span className="status-badge">{status}</span>;
        }
    };

    return (
        <div className="server-list">
            <h2>Server Inventory ({servers.length})</h2>
            {servers.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                    No servers found. Add one above to get started.
                </div>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>IP Address</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servers.map((server) => (
                                <tr key={server.id}>
                                    <td>{server.id}</td>
                                    <td style={{ fontWeight: 500 }}>{server.name}</td>
                                    <td style={{ fontFamily: 'monospace' }}>{server.ip_address}</td>
                                    <td>{getStatusBadge(server.status)}</td>
                                    <td>
                                        <button onClick={() => deleteServer(server.id)} className="delete-btn" title="Delete Server">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ServerList;

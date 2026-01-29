import React, { useState } from 'react';
import api from '../api';
import { PlusCircle } from 'lucide-react';

const AddServerForm = ({ onServerAdded }) => {
    const [name, setName] = useState('');
    const [ip, setIp] = useState('');
    const [status, setStatus] = useState('active');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post('/servers/', { name, ip_address: ip, status });
            onServerAdded(response.data);
            setName('');
            setIp('');
            setStatus('active');
        } catch (error) {
            console.error("Error adding server:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="add-server-form">
            <h2><PlusCircle size={20} /> Add New Server</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Server Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Web-Production-1"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>IP Address</label>
                        <input
                            type="text"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                            placeholder="192.168.1.1"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="active">Active</option>
                            <option value="stopped">Stopped</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </div>
                    <button type="submit" className="add-btn" disabled={isLoading}>
                        {isLoading ? 'Adding...' : 'Add Server'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddServerForm;

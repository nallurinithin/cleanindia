import { useState, useEffect } from 'react';
import { Search, ChevronDown, Download, User as UserIcon } from 'lucide-react';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';

interface ComplaintData {
    _id: string;
    complaintId: string;
    title: string;
    category: string;
    priority: string;
    location: string;
    description: string;
    status: string;
    aiScore?: number;
    assignedTo?: string;
    reportedAt: string;
}

const ManageComplaints = () => {
    const [complaintsData, setComplaintsData] = useState<ComplaintData[]>([]);

    // Filtering state
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/complaints');
                if (response.ok) {
                    const data = await response.json();
                    setComplaintsData(data);
                }
            } catch (error) {
                console.error('Failed to fetch complaints:', error);
            }
        };

        fetchComplaints();
    }, []);

    const handleResolve = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/complaints/${id}/resolve`, {
                method: 'PATCH',
            });
            if (response.ok) {
                // Update local state to reflect the change
                setComplaintsData(prev => prev.map(c =>
                    c._id === id ? { ...c, status: 'resolved' } : c
                ));
                toast.success('Complaint successfully marked as resolved!');
            }
        } catch (error) {
            console.error('Failed to resolve complaint:', error);
            toast.error('Failed to resolve complaint.');
        }
    };

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/complaints/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (response.ok) {
                setComplaintsData(prev => prev.map(c =>
                    c._id === id ? { ...c, status: newStatus } : c
                ));
                toast.success(`Complaint status securely updated to ${newStatus}.`);
            } else {
                toast.error('Failed to update complaint status.');
            }
        } catch (error) {
            console.error('Failed to update status:', error);
            toast.error('Could not reach servers.');
        }
    };

    const handleAssign = async (id: string, assignee: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/complaints/${id}/assign`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ assignedTo: assignee }),
            });
            if (response.ok) {
                setComplaintsData(prev => prev.map(c =>
                    c._id === id ? { ...c, assignedTo: assignee } : c
                ));
                toast.success(`Complaint assigned to ${assignee}`);
            } else {
                toast.error('Failed to assign complaint.');
            }
        } catch (error) {
            console.error('Failed to assign complaint:', error);
            toast.error('Could not reach servers.');
        }
    };

    // Derived filtered data
    const filteredComplaints = complaintsData.filter((complaint) => {
        const matchesSearch =
            complaint.complaintId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            complaint.title.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || complaint.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    return (
        <Layout type="admin">
            <div className="max-w-7xl mx-auto px-6 py-8 w-full">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#115e59] mb-2">Complaint Management</h1>
                    <p className="text-gray-500">Review, assign, and manage all citizen complaints</p>
                </div>

                {/* Filter Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by ID or title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all text-gray-700"
                        />
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative min-w-[160px] w-full md:w-auto">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all appearance-none font-medium text-gray-700"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>

                        <div className="relative min-w-[160px] w-full md:w-auto">
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all appearance-none font-medium text-gray-700"
                            >
                                <option value="all">All Priorities</option>
                                <option value="critical">Critical</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>

                        <button className="flex items-center gap-2 px-6 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap">
                            <Download className="w-4 h-4" /> Export
                        </button>
                    </div>
                </div>

                {/* Table meta info */}
                <p className="text-sm text-gray-500 mb-4">Showing {filteredComplaints.length} complaints</p>

                {/* Data Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-gray-100 bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-gray-900">ID</th>
                                    <th className="px-6 py-4 font-bold text-gray-900">Title</th>
                                    <th className="px-6 py-4 font-bold text-gray-900">Category</th>
                                    <th className="px-6 py-4 font-bold text-gray-900">Priority</th>
                                    <th className="px-6 py-4 font-bold text-gray-900">Status</th>
                                    <th className="px-6 py-4 font-bold text-gray-900">Location</th>
                                    <th className="px-6 py-4 font-bold text-gray-900">Reported</th>
                                    <th className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">Assigned To</th>
                                    <th className="px-6 py-4 font-bold text-gray-900 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredComplaints.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                                            No complaints match your filters.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredComplaints.map((complaint) => (
                                        <tr key={complaint._id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4 align-top">
                                                <span className="font-semibold text-gray-900 whitespace-nowrap">{complaint.complaintId}</span>
                                            </td>

                                            <td className="px-6 py-4 align-top max-w-[280px]">
                                                <div className="flex flex-col gap-1 items-start">
                                                    <span className="font-semibold text-gray-900 truncate w-full" title={complaint.title}>
                                                        {complaint.title}
                                                    </span>
                                                    {complaint.aiScore && (
                                                        <span className="bg-purple-100 text-[#a855f7] px-2 py-0.5 rounded text-[10px] font-bold tracking-wide mt-1">
                                                            AI: {complaint.aiScore}%
                                                        </span>
                                                    )}
                                                    <div className="flex gap-2 mt-2">
                                                        {complaint.status !== 'resolved' && (
                                                            <button
                                                                onClick={() => handleResolve(complaint._id)}
                                                                className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold px-2 py-1 rounded transition-colors"
                                                            >
                                                                Resolve
                                                            </button>
                                                        )}
                                                        <button className="text-xs text-gray-500 hover:text-[#115e59] font-semibold transition-colors">
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 align-top text-gray-600 whitespace-nowrap">
                                                {complaint.category}
                                            </td>

                                            <td className="px-6 py-4 align-top">
                                                <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase whitespace-nowrap
                                                    ${complaint.priority === 'critical' ? 'bg-red-100 text-red-600' : ''}
                                                    ${complaint.priority === 'high' ? 'bg-orange-100 text-orange-600' : ''}
                                                    ${complaint.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : ''}
                                                    ${complaint.priority === 'low' ? 'bg-green-100 text-green-600' : ''}
                                                `}>
                                                    {complaint.priority}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 align-top">
                                                <span className={`inline-block px-3 py-1 rounded text-[10px] font-bold tracking-wide uppercase whitespace-nowrap text-white
                                                    ${complaint.status === 'in progress' ? 'bg-[#3b82f6]' : ''}
                                                    ${complaint.status === 'pending' ? 'bg-[#f97316]' : ''}
                                                    ${complaint.status === 'resolved' ? 'bg-[#22c55e]' : ''}
                                                `}>
                                                    {complaint.status}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 align-top text-gray-600 whitespace-nowrap">
                                                {complaint.location}
                                            </td>

                                            <td className="px-6 py-4 align-top text-gray-600 whitespace-nowrap">
                                                {new Date(complaint.reportedAt).toLocaleDateString()}
                                            </td>

                                            <td className="px-6 py-4 align-top text-gray-600 whitespace-nowrap">
                                                <select
                                                    value={complaint.assignedTo || ''}
                                                    onChange={(e) => handleAssign(complaint._id, e.target.value)}
                                                    className="bg-transparent border-b border-gray-300 border-dashed pb-0.5 text-sm focus:outline-none focus:border-[#115e59] text-gray-700 cursor-pointer appearance-none pr-4"
                                                    style={{ backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239ca3af%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '8px auto' }}
                                                >
                                                    <option value="" disabled>Unassigned</option>
                                                    <option value="Sanitation Dept">Sanitation Dept</option>
                                                    <option value="Roads & Highways">Roads & Highways</option>
                                                    <option value="Water Board">Water Board</option>
                                                    <option value="Electrical Dept">Electrical Dept</option>
                                                    <option value="Parks & Rec">Parks & Rec</option>
                                                    <option value="City Police">City Police</option>
                                                </select>
                                            </td>

                                            <td className="px-6 py-4 align-top text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors bg-white shadow-sm">
                                                        <UserIcon className="w-4 h-4" />
                                                    </button>

                                                    <div className="relative inline-block text-left w-full max-w-[160px]">
                                                        <select
                                                            value={complaint.status}
                                                            onChange={(e) => handleUpdateStatus(complaint._id, e.target.value)}
                                                            className="w-full bg-gray-50 border border-gray-200 text-gray-700 pl-3 pr-10 py-1.5 rounded text-sm font-semibold hover:bg-gray-100 transition-colors shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#115e59]/20"
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="in progress">In Progress</option>
                                                            <option value="resolved">Resolved</option>
                                                        </select>
                                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                            <ChevronDown className="w-4 h-4 text-gray-400" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default ManageComplaints;

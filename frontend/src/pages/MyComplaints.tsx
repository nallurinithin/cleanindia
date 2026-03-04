import { useState, useEffect } from 'react';
import { Search, ChevronDown, Download, ThumbsUp, MapPin, Eye } from 'lucide-react';
import Layout from '../components/Layout';

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

const MyComplaints = () => {
    const [complaints, setComplaints] = useState<ComplaintData[]>([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/complaints`);
                if (response.ok) {
                    const data = await response.json();
                    setComplaints(data);
                }
            } catch (error) {
                console.error('Failed to fetch complaints:', error);
            }
        };

        fetchComplaints();
    }, []);

    // Color mappings
    const priorityColor = (priority: string) => {
        switch (priority.toLowerCase()) {
            case 'critical': return 'border-red-200 text-red-600 bg-red-50';
            case 'high': return 'border-orange-200 text-orange-600 bg-orange-50';
            case 'medium': return 'border-yellow-200 text-yellow-600 bg-yellow-50';
            case 'low': return 'border-green-200 text-green-600 bg-green-50';
            default: return 'border-blue-200 text-blue-600 bg-blue-50';
        }
    };

    const statusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'resolved': return 'bg-green-500 text-white';
            case 'in progress': return 'bg-blue-500 text-white';
            default: return 'bg-orange-500 text-white';
        }
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-[#115e59] mb-2">My Complaints</h1>
                    <p className="text-gray-500">Track and manage all your reported civic issues</p>
                </div>

                {/* Filter Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by title or location..."
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#115e59]/20 focus:border-[#115e59] transition-all"
                        />
                    </div>
                    <div className="relative min-w-[200px] w-full md:w-auto">
                        <select className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#115e59]/20 focus:border-[#115e59] transition-all appearance-none font-semibold text-gray-700">
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                    <div className="relative min-w-[200px] w-full md:w-auto">
                        <select className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#115e59]/20 focus:border-[#115e59] transition-all appearance-none font-semibold text-gray-700">
                            <option value="all">All Categories</option>
                            <option value="garbage">Garbage</option>
                            <option value="pothole">Pothole</option>
                            <option value="drainage">Drainage</option>
                            <option value="streetlight">Street Light</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* List Header */}
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-500">Showing {complaints.length} complaints</p>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>

                {/* Complaints List */}
                <div className="space-y-4 mb-12">
                    {complaints.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
                            No complaints reported yet.
                        </div>
                    ) : (
                        complaints.map(complaint => (
                            <div key={complaint._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                                <div className="w-full md:w-[280px] h-[200px] md:h-auto bg-gray-100 flex-shrink-0 relative flex items-center justify-center text-4xl text-gray-300 font-bold">
                                    {complaint.category.charAt(0).toUpperCase()}
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-start justify-between mb-1">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <h3 className="text-lg font-bold text-gray-900">{complaint.title}</h3>
                                                {complaint.aiScore && (
                                                    <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-bold tracking-wide">
                                                        AI: {complaint.aiScore}%
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <span className={`border px-2 py-1 rounded text-[10px] font-bold tracking-wide uppercase ${priorityColor(complaint.priority)}`}>
                                                    {complaint.priority}
                                                </span>
                                                <span className={`px-3 py-1 rounded text-[10px] font-bold tracking-wide uppercase ${statusColor(complaint.status)}`}>
                                                    {complaint.status}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-400 font-medium mb-4">{complaint.complaintId}</p>

                                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-4">
                                            <div>
                                                <p className="text-xs text-gray-400 mb-0.5">Location</p>
                                                <p className="text-sm font-medium text-gray-800">{complaint.location}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 mb-0.5">Category</p>
                                                <p className="text-sm font-medium text-gray-800">{complaint.category}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 mb-0.5">Reported Date</p>
                                                <p className="text-sm font-medium text-gray-800">{new Date(complaint.reportedAt).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 mb-0.5">Assigned To</p>
                                                <p className="text-sm font-medium text-gray-800">{complaint.assignedTo || '—'}</p>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-500 line-clamp-2">
                                            {complaint.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1.5 text-orange-500 font-medium"><ThumbsUp className="w-4 h-4 fill-orange-500" /> 0 upvotes</span>
                                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-red-400" /> Nearby</span>
                                        </div>
                                        <button className="flex items-center gap-2 bg-[#115e59] text-white px-5 py-2 rounded-md font-semibold text-sm hover:bg-[#0f4d49] transition-colors">
                                            <Eye className="w-4 h-4" /> View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </Layout>
    );
};

export default MyComplaints;

import { useState, useEffect } from 'react';
import { TrendingUp, Clock, Activity, CheckCircle, AlertCircle, Timer, Users, BarChart2, MapPin, PieChart as PieChartIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import Layout from '../components/Layout';

const trendData = [
    { name: 'Aug', total: 700, resolved: 500 },
    { name: 'Sep', total: 850, resolved: 650 },
    { name: 'Oct', total: 800, resolved: 700 },
    { name: 'Nov', total: 1150, resolved: 980 },
    { name: 'Dec', total: 950, resolved: 850 },
    { name: 'Jan', total: 1100, resolved: 950 },
    { name: 'Feb', total: 1247, resolved: 1050 },
];

const categoryData = [
    { name: 'Garbage', value: 26, color: '#166534' }, // dark green
    { name: 'Others', value: 17, color: '#a855f7' }, // purple
    { name: 'Water Supply', value: 11, color: '#eab308' }, // yellow
    { name: 'Street Lights', value: 13, color: '#22c55e' }, // green
    { name: 'Drainage', value: 14, color: '#0ea5e9' }, // sky blue
    { name: 'Potholes', value: 20, color: '#f97316' }, // orange
];

const wardData = [
    { name: 'Ward 45', issues: 85 },
    { name: 'Ward 12', issues: 75 },
    { name: 'Ward 67', issues: 65 },
    { name: 'Ward 89', issues: 55 },
    { name: 'Ward 23', issues: 45 },
    { name: 'Ward 101', issues: 40 },
];

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
    reportedBy?: string;
    reportedAt: string;
    resolvedAt?: string;
}

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        total: 0,
        resolved: 0,
        pending: 0,
        inProgress: 0,
        critical: 0,
        avgResolution: '0h'
    });

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/complaints`);
                if (response.ok) {
                    const data: ComplaintData[] = await response.json();

                    const resolvedCount = data.filter(c => c.status === 'resolved').length;
                    const pendingCount = data.filter(c => c.status === 'pending').length;
                    const inProgressCount = data.filter(c => c.status === 'in progress').length;
                    const criticalCount = data.filter(c => c.priority === 'critical').length;

                    // Calculate Average Resolution Time
                    let totalResolutionMs = 0;
                    let resolvedWithDates = 0;

                    data.forEach(c => {
                        if (c.status === 'resolved' && c.resolvedAt && c.reportedAt) {
                            const resolvedMs = new Date(c.resolvedAt).getTime();
                            const reportedMs = new Date(c.reportedAt).getTime();
                            totalResolutionMs += (resolvedMs - reportedMs);
                            resolvedWithDates++;
                        }
                    });

                    let avgResText = '0h';
                    if (resolvedWithDates > 0) {
                        const avgMs = totalResolutionMs / resolvedWithDates;
                        const avgHours = Math.floor(avgMs / (1000 * 60 * 60));
                        if (avgHours < 24) {
                            avgResText = `${avgHours}h`;
                        } else {
                            const avgDays = Math.floor(avgHours / 24);
                            avgResText = `${avgDays}d`;
                        }
                    }

                    setStats({
                        total: data.length,
                        resolved: resolvedCount,
                        pending: pendingCount,
                        inProgress: inProgressCount,
                        critical: criticalCount,
                        avgResolution: avgResText
                    });
                }
            } catch (error) {
                console.error('Failed to fetch complaints:', error);
            }
        };

        fetchComplaints();
    }, []);
    return (
        <Layout type="admin">
            <div className="max-w-7xl mx-auto px-6 py-8 w-full">
                {/* Header title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#115e59] mb-1">Admin Dashboard</h1>
                    <p className="text-gray-500">Municipal Corporation - Complaint Management Overview</p>
                </div>

                {/* KPI Cards */}
                <div className="space-y-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Avg Resolution */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Avg. Resolution</p>
                                <h2 className="text-3xl font-bold text-gray-900 mb-1">{stats.avgResolution}</h2>
                                <p className="text-xs text-green-600 flex items-center gap-1 font-medium bg-green-50 w-fit px-2 py-0.5 rounded-full mt-2">
                                    <TrendingUp className="w-3 h-3" /> Real-time Based
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                                <Timer className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>

                        {/* Pending */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border-l-[3px] border-l-orange-500 border border-t-gray-100 border-r-gray-100 border-b-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Pending</p>
                                <h2 className="text-3xl font-bold text-[#ea580c] mb-1">{stats.pending}</h2>
                                <p className="text-xs text-[#ea580c] font-medium">Needs attention</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center">
                                <Clock className="w-6 h-6" />
                            </div>
                        </div>

                        {/* In Progress */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border-l-[3px] border-l-purple-500 border border-t-gray-100 border-r-gray-100 border-b-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">In Progress</p>
                                <h2 className="text-3xl font-bold text-purple-600 mb-1">{stats.inProgress}</h2>
                                <p className="text-xs text-purple-500 font-medium">Active assignments</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center">
                                <Activity className="w-6 h-6" />
                            </div>
                        </div>

                        {/* Resolved */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border-l-[3px] border-l-green-500 border border-t-gray-100 border-r-gray-100 border-b-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Resolved</p>
                                <h2 className="text-3xl font-bold text-green-600 mb-1">{stats.resolved}</h2>
                                <p className="text-xs text-green-600 font-medium">↑ 8% resolution rate</p>
                            </div>
                            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Critical Issues */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Critical Issues</p>
                                <h2 className="text-2xl font-bold text-gray-900">{stats.critical}</h2>
                            </div>
                        </div>

                        {/* Avg Resolution */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                                <Timer className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Avg Resolution Time</p>
                                <h2 className="text-2xl font-bold text-gray-900">4.2 <span className="text-base font-normal">days</span></h2>
                            </div>
                        </div>

                        {/* Active Citizens */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Active Citizens</p>
                                <h2 className="text-2xl font-bold text-gray-900">2,845</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-1">Monthly Complaint Trend</h3>
                        <p className="text-sm text-gray-500 mb-6">Complaints vs Resolved (Last 7 months)</p>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                    <RechartsTooltip
                                        contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                                    <Line type="monotone" dataKey="total" name="Total Complaints" stroke="#115e59" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#22c55e" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-1">Category Distribution</h3>
                        <p className="text-sm text-gray-500 mb-6">Complaints by type</p>
                        <div className="h-[300px] w-full flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={100}
                                        innerRadius={0}
                                        dataKey="value"
                                        label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Ward-wise Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
                    <h3 className="font-bold text-gray-900 mb-1">Ward-wise Issue Distribution</h3>
                    <p className="text-sm text-gray-500 mb-6">Top 6 wards with most complaints</p>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={wardData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                <RechartsTooltip
                                    cursor={{ fill: '#F3F4F6' }}
                                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                                <Bar dataKey="issues" name="Total Issues" fill="#166534" radius={[4, 4, 0, 0]} barSize={60} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:border-emerald-500 hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <BarChart2 className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Generate Report</h3>
                        <p className="text-xs text-gray-500">Export analytics</p>
                    </button>

                    <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:border-emerald-500 hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Map View</h3>
                        <p className="text-xs text-gray-500">View heatmap</p>
                    </button>

                    <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:border-emerald-500 hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <Users className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Team Management</h3>
                        <p className="text-xs text-gray-500">Assign workers</p>
                    </button>

                    <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:border-emerald-500 hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                            <PieChartIcon className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">SLA Tracking</h3>
                        <p className="text-xs text-gray-500">Monitor timelines</p>
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;

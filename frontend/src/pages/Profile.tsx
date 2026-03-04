import { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, Edit2, Shield, Camera, FileText } from 'lucide-react';

const Profile = ({ type = 'citizen' }: { type?: 'citizen' | 'admin' }) => {
    // Read cached values from localStorage
    const savedRole = localStorage.getItem('userRole') || type;
    const isActuallyAdmin = savedRole === 'admin';

    const initialData = {
        name: localStorage.getItem('userName') || (isActuallyAdmin ? 'Admin User' : 'Rajesh Kumar'),
        email: localStorage.getItem('userEmail') || (isActuallyAdmin ? 'admin@cleanindia.gov.in' : 'rajesh.kumar@example.com'),
        phone: localStorage.getItem('userPhone') || (isActuallyAdmin ? '1800-XXX-XXXX' : '+91 98765 43210'),
        address: isActuallyAdmin ? 'Municipal Corporation HQ, New Delhi' : 'A-123, Vasant Kunj, New Delhi',
        joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        // In a real app, this would trigger an API call to save the user data
        setIsEditing(false);
        // We could also show a success toast message here
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
                    <p className="text-gray-500 text-sm">Manage your personal information and preferences.</p>
                </div>
                <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${isEditing
                        ? 'bg-[#115e59] text-white hover:bg-[#0f4d49]'
                        : 'bg-white text-[#115e59] border border-[#115e59] hover:bg-emerald-50'
                        }`}
                >
                    {isEditing ? (
                        <>
                            <Save className="w-4 h-4" />
                            Save Changes
                        </>
                    ) : (
                        <>
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                        </>
                    )}
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Profile Header/Avatar */}
                <div className="p-8 bg-gradient-to-r from-emerald-50 to-white border-b border-gray-100 flex flex-col md:flex-row items-center gap-6">
                    <div className="relative group">
                        <div className="w-24 h-24 bg-[#115e59] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
                            {formData.name.charAt(0)}
                        </div>
                        {isEditing && (
                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        )}
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-gray-900">{formData.name}</h3>
                        <div className="flex items-center gap-2 mt-1 justify-center md:justify-start">
                            {isActuallyAdmin ? (
                                <span className="bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                                    <Shield className="w-3 h-3" /> System Admin
                                </span>
                            ) : (
                                <span className="bg-emerald-100 text-[#115e59] px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                                    <User className="w-3 h-3" /> Verified Citizen
                                </span>
                            )}
                            <span className="text-gray-500 text-sm ml-2">Joined {formData.joined}</span>
                        </div>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <User className="w-4 h-4 text-emerald-600" /> Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#115e59]/20 focus:border-[#115e59] transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-emerald-600" /> Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#115e59]/20 focus:border-[#115e59] transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-emerald-600" /> Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#115e59]/20 focus:border-[#115e59] transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-emerald-600" /> Primary Address
                            </label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                disabled={!isEditing}
                                rows={3}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#115e59]/20 focus:border-[#115e59] transition-all disabled:opacity-75 disabled:cursor-not-allowed resize-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Empty state for Activity / Rewards (Visual only) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                        <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm">Your most recent reported issues will appear here.</p>
                </div>
            </div>

        </div>
    );
};

export default Profile;

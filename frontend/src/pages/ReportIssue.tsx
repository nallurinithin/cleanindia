import { useState, useRef } from 'react';
import { Camera, Upload as UploadIcon, MapPin, CheckCircle, Navigation, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const ReportIssue = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        priority: '',
        location: '',
        description: ''
    });

    const [isLocating, setIsLocating] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();
                    if (data.display_name) {
                        setFormData(prev => ({ ...prev, location: data.display_name }));
                    } else {
                        setFormData(prev => ({ ...prev, location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }));
                    }
                } catch (error) {
                    console.error('Error fetching address:', error);
                    setFormData(prev => ({ ...prev, location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }));
                } finally {
                    setIsLocating(false);
                }
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Unable to retrieve your location. Please check your browser permissions.');
                setIsLocating(false);
            }
        );
    };

    const handlePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Submitting with actual User email from localStorage if available
            const userEmail = localStorage.getItem('userEmail') || 'Anonymous';
            const payload = {
                ...formData,
                reportedBy: userEmail
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/complaints`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Complaint submitted successfully!');
                navigate('/dashboard');
            } else {
                alert('Failed to submit complaint. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting complaint:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#115e59] mb-2">Report a Civic Issue</h1>
                    <p className="text-gray-500">Help us maintain a clean and safe city by reporting issues in your area</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Complaint Details</h2>
                    <p className="text-sm text-gray-500 mb-6">Please provide accurate information to help us address the issue quickly</p>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Issue Title <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                placeholder="Brief description of the issue"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#115e59]/20 focus:border-[#115e59] transition-all"
                            />
                        </div>

                        {/* Category and Priority */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Category <span className="text-red-500">*</span></label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#115e59]/20 focus:border-[#115e59] transition-all appearance-none"
                                >
                                    <option value="" disabled>Select category</option>
                                    <option value="Garbage">Garbage</option>
                                    <option value="Potholes">Pothole</option>
                                    <option value="Drainage">Drainage</option>
                                    <option value="Street Lights">Street Light</option>
                                    <option value="Water Supply">Water Supply</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Priority Level <span className="text-red-500">*</span></label>
                                <select
                                    required
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#115e59]/20 focus:border-[#115e59] transition-all appearance-none"
                                >
                                    <option value="" disabled>Select priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="critical">Critical</option>
                                </select>
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Location <span className="text-red-500">*</span></label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Enter location or address"
                                    required
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#115e59]/20 focus:border-[#115e59] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={handleGetLocation}
                                    disabled={isLocating}
                                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                                >
                                    <MapPin className="w-4 h-4" /> {isLocating ? 'Locating...' : 'Use GPS'}
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">Click "Use GPS" to automatically detect your current location</p>
                        </div>

                        {/* Detailed Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Detailed Description <span className="text-red-500">*</span></label>
                            <textarea
                                rows={4}
                                placeholder="Provide detailed information about the issue..."
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#115e59]/20 focus:border-[#115e59] transition-all resize-none"
                            ></textarea>
                        </div>

                        {/* Upload Photo */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Upload Photo <span className="text-red-500">*</span></label>
                            <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handlePhotoChange}
                            />
                            <div
                                onClick={handlePhotoClick}
                                className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center relative overflow-hidden"
                            >
                                {photoPreview && (
                                    <img src={photoPreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                )}
                                <div className="z-10 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-gray-400">
                                        <Camera className="w-6 h-6" />
                                    </div>
                                    <p className="font-semibold text-gray-900 text-sm mb-1">{photoPreview ? 'Click to change photo' : 'Click to take photo'}</p>
                                    <p className="text-xs text-gray-500">Opens device camera or file explorer</p>
                                </div>
                            </div>
                        </div>

                        {/* AI Classification Info */}
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <UploadIcon className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-blue-900 mb-1">AI-Powered Classification</h4>
                                <p className="text-sm text-blue-700 leading-relaxed">
                                    Our AI system will automatically analyze your photo to classify the issue type and priority level, ensuring faster resolution.
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-4 border-t border-gray-100">
                            <button type="button" onClick={() => navigate(-1)} className="flex-1 py-3 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                            <button type="submit" disabled={isSubmitting} className={`flex-[2] py-3 rounded-lg text-sm font-semibold text-white transition-colors ${isSubmitting ? 'bg-[#0f4d49] opacity-70' : 'bg-[#115e59] hover:bg-[#0f4d49]'}`}>
                                {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-4">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Fast Response</h3>
                        <p className="text-sm text-gray-500">Get updates within 24 hours</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mb-4">
                            <Navigation className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">GPS Tracking</h3>
                        <p className="text-sm text-gray-500">Precise location detection</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
                            <ImageIcon className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Photo Evidence</h3>
                        <p className="text-sm text-gray-500">Visual proof speeds resolution</p>
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default ReportIssue;

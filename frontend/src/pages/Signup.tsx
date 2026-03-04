import { useState } from 'react';
import { Mail, Lock, User as UserIcon, Shield, Phone } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
    const [role, setRole] = useState<'citizen' | 'admin'>('citizen');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        const tid = toast.loading('Creating account...');

        try {
            const payload = { role, name, phone, email, password };
            const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Registration successful!', { id: tid });
                navigate('/login', { state: location.state });
            } else {
                toast.error(data.message || 'Registration failed', { id: tid });
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('An error occurred. Please try again.', { id: tid });
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 font-sans">
            {/* Header section */}
            <div className="text-center mb-8">
                <div className="mx-auto w-12 h-12 bg-[#115e59] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                    CI
                </div>
                <h1 className="text-2xl font-bold text-[#115e59] mb-1">Clean India</h1>
                <p className="text-gray-500 text-sm">Smart City Civic Management Platform</p>
            </div>

            {/* Signup Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-[400px]">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Create Account</h2>
                    <p className="text-gray-500 text-sm mt-1">Sign up to start reporting and tracking civic issues</p>
                </div>

                {/* Role Toggle */}
                <div className="bg-gray-100 p-1 rounded-lg flex mb-6">
                    <button
                        onClick={() => setRole('citizen')}
                        className={`flex-1 py-1.5 flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors ${role === 'citizen'
                            ? 'bg-[#115e59] text-white shadow'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <UserIcon className="w-4 h-4" />
                        Citizen
                    </button>
                    <button
                        onClick={() => setRole('admin')}
                        className={`flex-1 py-1.5 flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors ${role === 'admin'
                            ? 'bg-[#ea580c] text-white shadow'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Shield className="w-4 h-4" />
                        Admin
                    </button>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSignup} autoComplete="off">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#115e59]/20 focus:border-[#115e59] transition-all"
                                required
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Phone Number
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your phone number"
                                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#115e59]/20 focus:border-[#115e59] transition-all"
                                required
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            {role === 'citizen' ? 'Email' : 'Admin Email'}
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={role === 'citizen' ? 'Enter your email' : 'Enter admin email'}
                                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#115e59]/20 focus:border-[#115e59] transition-all"
                                required
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#115e59]/20 focus:border-[#115e59] transition-all"
                                required
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2.5 rounded-lg text-white font-medium text-sm transition-colors mt-2 ${role === 'citizen'
                            ? 'bg-[#115e59] hover:bg-[#0f4d49]'
                            : 'bg-[#ea580c] hover:bg-[#c2410c]'
                            }`}
                    >
                        Sign Up as {role === 'citizen' ? 'Citizen' : 'Admin'}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-500 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" state={location.state} className="text-[#115e59] font-medium hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;

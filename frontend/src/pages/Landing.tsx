import { motion } from 'framer-motion';
import { Leaf, Camera, MapPin, CheckCircle, ArrowRight, ShieldCheck, Activity, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const Landing = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">

            {/* Navigation Layer */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-[#115e59] rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-md">
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none">CLEAN <span className="text-[#115e59]">INDIA</span></h1>
                            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Civic Platform</p>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-gray-600">
                        <a href="#features" className="hover:text-[#115e59] transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-[#115e59] transition-colors">How it Works</a>
                        <a href="#impact" className="hover:text-[#115e59] transition-colors">Impact</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/login" className="hidden md:block text-sm font-semibold text-gray-700 hover:text-[#115e59] transition-colors">Log In</Link>
                        <Link to="/signup" className="bg-[#115e59] text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#0f4d49] hover:shadow-md transition-all">Get Started</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-emerald-50/50 to-transparent skew-x-12 origin-top"></div>
                    <div className="absolute top-20 -left-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute top-40 right-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="text-center md:text-left"
                    >
                        <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wide mb-6 border border-emerald-100">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Smart City Initiative
                        </motion.div>

                        <motion.h1 variants={fadeIn} className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight mb-6">
                            Report. Resolve. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#115e59] to-emerald-400">Transform.</span>
                        </motion.h1>

                        <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
                            Empowering citizens to build cleaner, safer communities. Snap a photo of civic issues and our AI routes it directly to the responsible authorities for rapid resolution.
                        </motion.p>

                        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                            <Link to="/login" state={{ from: '/report' }} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#115e59] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#0f4d49] hover:shadow-lg hover:-translate-y-0.5 transition-all">
                                <Camera className="w-5 h-5" />
                                Report an Issue
                            </Link>
                            <Link to="/login" state={{ from: '/dashboard' }} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all">
                                View Dashboard
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Abstract Hero Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="hidden md:block relative"
                    >
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            {/* Main Phone Mockup */}
                            <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-2xl border-8 border-gray-900 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 z-20">
                                <div className="h-16 bg-[#115e59] flex items-center justify-center rounded-b-3xl">
                                    <span className="text-white font-bold tracking-widest text-sm">CLEAN INDIA</span>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="w-full h-32 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                                        <Camera className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="h-6 bg-orange-100 rounded w-16"></div>
                                        <div className="h-6 bg-blue-100 rounded w-20"></div>
                                    </div>
                                    <div className="mt-8 h-12 bg-[#115e59] rounded-xl flex items-center justify-center">
                                        <span className="text-white text-sm font-bold">Submit Report</span>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative elements behind phone */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -top-10 -right-10 bg-white p-4 rounded-xl shadow-xl border border-gray-100 z-30 flex items-center gap-3"
                            >
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Issue Resolved</p>
                                    <p className="text-xs text-gray-500">2 mins ago</p>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 20, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-10 -left-10 bg-white p-4 rounded-xl shadow-xl border border-gray-100 z-30 flex items-center gap-3"
                            >
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Activity className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">AI Analyzed</p>
                                    <p className="text-xs text-gray-500">Urgent Priority</p>
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeIn}
                        className="text-center max-w-2xl mx-auto mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Powered by Technology</h2>
                        <p className="text-lg text-gray-600">Our platform uses advanced AI and real-time mapping to ensure civic issues are handled efficiently and transparently.</p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                icon: <Activity className="w-6 h-6 text-purple-600" />,
                                bg: "bg-purple-50",
                                title: "AI Classification",
                                desc: "Upload a photo and our AI instantly categorizes the issue and assigns priority, eliminating human delay."
                            },
                            {
                                icon: <MapPin className="w-6 h-6 text-blue-600" />,
                                bg: "bg-blue-50",
                                title: "Precise Mapping",
                                desc: "Automatic GPS tagging ensures ground teams know exactly where to go, reducing response times significantly."
                            },
                            {
                                icon: <ShieldCheck className="w-6 h-6 text-[#115e59]" />,
                                bg: "bg-emerald-50",
                                title: "Transparent Tracking",
                                desc: "Follow your complaint's journey from submission to resolution with live status updates on your dashboard."
                            }
                        ].map((feature, i) => (
                            <motion.div key={i} variants={fadeIn} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-6`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How it Works */}
            <section id="how-it-works" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Fixing your city is easy</h2>
                    </motion.div>

                    <div className="relative">
                        {/* Connecting line for desktop */}
                        <div className="hidden md:block absolute top-[60px] left-[10%] w-[80%] h-0.5 bg-gray-100 z-0">
                            <div className="h-full bg-[#115e59] w-1/2"></div>
                        </div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="grid md:grid-cols-3 gap-12 relative z-10"
                        >
                            {[
                                { step: "01", title: "Spot & Snap", desc: "See an issue? Take a photo using our app. Location is auto-tagged." },
                                { step: "02", title: "AI Routing", desc: "Our system instantly routes the ticket to the correct municipal department." },
                                { step: "03", title: "Track & Verify", desc: "Get notified when the issue is resolved and view proof of work." }
                            ].map((item, i) => (
                                <motion.div key={i} variants={fadeIn} className="text-center relative">
                                    <div className="w-32 h-32 mx-auto bg-white border-4 border-[#115e59] rounded-full flex items-center justify-center mb-6 shadow-xl relative z-10">
                                        <span className="text-4xl font-black text-[#115e59]">{item.step}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 px-4">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA / Impact Section */}
            <section id="impact" className="py-24 bg-[#115e59] relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>

                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center text-white">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black mb-8 leading-tight"
                    >
                        Ready to make a difference in your neighborhood?
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
                    >
                        <Link to="/signup" className="bg-white text-[#115e59] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 hover:shadow-xl transition-all flex items-center justify-center gap-2">
                            Join the Movement <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-white/20"
                    >
                        {[
                            { icon: <Users />, count: "10K+", label: "Active Citizens" },
                            { icon: <CheckCircle />, count: "8,402", label: "Issues Resolved" },
                            { icon: <MapPin />, count: "142", label: "Wards Covered" },
                            { icon: <Activity />, count: "48h", label: "Avg Resolution" },
                        ].map((stat, i) => (
                            <motion.div key={i} variants={fadeIn} className="text-center">
                                <div className="w-8 h-8 mx-auto text-emerald-300 mb-3">{stat.icon}</div>
                                <h4 className="text-3xl font-black mb-1">{stat.count}</h4>
                                <p className="text-sm font-medium text-emerald-100 opacity-80 uppercase tracking-wider">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12 text-sm text-center">
                <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
                    <Leaf className="w-5 h-5" />
                    <span className="font-bold tracking-widest text-white">CLEAN INDIA</span>
                </div>
                <p>© {new Date().getFullYear()} Clean India Initiative. Transforming civic management.</p>
            </footer>
        </div>
    );
};

export default Landing;

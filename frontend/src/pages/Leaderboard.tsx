import { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Star } from 'lucide-react';
import Layout from '../components/Layout';

interface ComplaintData {
    reportedBy: string;
}

interface UserRank {
    name: string;
    reports: number;
    initials: string;
}

const Leaderboard = () => {
    const [rankings, setRankings] = useState<UserRank[]>([]);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/complaints');
                if (response.ok) {
                    const data: ComplaintData[] = await response.json();

                    // Group reports by user
                    const userCounts: Record<string, number> = {};
                    data.forEach(complaint => {
                        const name = complaint.reportedBy || 'Anonymous';
                        if (name !== 'Anonymous') {
                            userCounts[name] = (userCounts[name] || 0) + 1;
                        }
                    });

                    // Convert to array, assign initials, and sort
                    const sortedRankings = Object.entries(userCounts)
                        .map(([name, reports]) => {
                            const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                            return { name, reports, initials };
                        })
                        .sort((a, b) => b.reports - a.reports);

                    setRankings(sortedRankings);
                }
            } catch (error) {
                console.error('Failed to fetch leaderboard rankings:', error);
            }
        };

        fetchRankings();
    }, []);

    const topThree = rankings.slice(0, 3);

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="text-center mb-12 flex flex-col items-center">
                    <h1 className="text-3xl font-bold text-[#115e59] mb-2 leading-tight">Citizen Leaderboard</h1>
                    <p className="text-gray-500">Recognizing active citizens contributing to a cleaner India</p>
                </div>

                {/* Top 3 Rankings */}
                {topThree.length > 0 && (
                    <div className="flex flex-col md:flex-row items-end justify-center gap-6 mb-16">
                        {/* Rank 2 */}
                        {topThree[1] && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center w-full md:w-[280px] order-2 md:order-1 relative pb-10">
                                <div className="w-20 h-20 rounded-full bg-slate-400 text-white flex items-center justify-center text-2xl font-bold mb-4">
                                    {topThree[1].initials}
                                </div>
                                <div className="w-8 h-8 rounded-full bg-slate-400 text-white flex items-center justify-center font-bold text-lg mb-4 z-10 p-5 mt-[-25px] border-4 border-white">
                                    2
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{topThree[1].name}</h3>
                                <span className="flex items-center gap-1.5 bg-slate-400 text-white px-3 py-0.5 rounded-full text-xs font-semibold mb-6">
                                    <Medal className="w-3 h-3" /> Silver
                                </span>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-slate-500">{topThree[1].reports}</p>
                                    <p className="text-xs text-gray-400">Reports Filed</p>
                                </div>
                            </div>
                        )}

                        {/* Rank 1 */}
                        {topThree[0] && (
                            <div className="bg-white rounded-xl shadow-md border-2 border-yellow-400 p-6 flex flex-col items-center w-full md:w-[320px] order-1 md:order-2 relative pb-12 z-10 transform md:-translate-y-4">
                                <div className="absolute -top-6 bg-yellow-400 rounded-full p-2.5 shadow-sm text-white">
                                    <Trophy className="w-7 h-7" />
                                </div>
                                <div className="w-24 h-24 rounded-full bg-yellow-500 text-white flex items-center justify-center text-3xl font-bold mb-4 mt-6">
                                    {topThree[0].initials}
                                </div>
                                <div className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold text-xl mb-4 z-10 p-6 mt-[-30px] border-4 border-white shadow-sm">
                                    1
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{topThree[0].name}</h3>
                                <span className="flex items-center gap-1.5 bg-yellow-400 text-white px-3 py-0.5 rounded-full text-xs font-bold mb-6">
                                    <Trophy className="w-3 h-3" /> Gold
                                </span>
                                <div className="text-center">
                                    <p className="text-4xl font-bold text-yellow-500">{topThree[0].reports}</p>
                                    <p className="text-sm text-gray-400">Reports Filed</p>
                                </div>
                            </div>
                        )}

                        {/* Rank 3 */}
                        {topThree[2] && (
                            <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 flex flex-col items-center w-full md:w-[280px] order-3 relative pb-10 mt-12 md:mt-0">
                                <div className="w-20 h-20 rounded-full bg-orange-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
                                    {topThree[2].initials}
                                </div>
                                <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-lg mb-4 z-10 p-5 mt-[-25px] border-4 border-white">
                                    3
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{topThree[2].name}</h3>
                                <span className="flex items-center gap-1.5 bg-orange-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold mb-6">
                                    <Award className="w-3 h-3" /> Bronze
                                </span>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-orange-600">{topThree[2].reports}</p>
                                    <p className="text-xs text-gray-400">Reports Filed</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Complete Rankings List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-12">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Complete Rankings</h2>
                    <p className="text-sm text-gray-500 mb-6">Top contributors this month</p>

                    <div className="flex flex-col gap-3">
                        {rankings.map((user, index) => (
                            <div key={user.name} className={`flex items-center gap-4 p-4 rounded-xl ${index === 0 ? 'bg-green-50/50 border border-green-100/50' : 'bg-gray-50 border border-gray-100'}`}>
                                <span className="text-lg font-bold text-gray-700 w-6 text-center">{index + 1}</span>
                                <div className="w-10 h-10 rounded-full bg-[#115e59] text-white flex items-center justify-center font-bold text-sm">
                                    {user.initials}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-gray-900">{user.name}</h4>
                                    <p className="text-xs text-gray-500">{user.reports} reports filed</p>
                                </div>
                                {user.reports >= 50 && (
                                    <span className="flex items-center gap-1.5 bg-yellow-400 text-white px-2.5 py-1 rounded-md text-xs font-semibold mr-2">
                                        <Trophy className="w-3 h-3" /> Gold
                                    </span>
                                )}
                                {user.reports >= 30 && user.reports < 50 && (
                                    <span className="flex items-center gap-1.5 bg-slate-400 text-white px-2.5 py-1 rounded-md text-xs font-semibold mr-2">
                                        <Medal className="w-3 h-3" /> Silver
                                    </span>
                                )}
                                {user.reports >= 15 && user.reports < 30 && (
                                    <span className="flex items-center gap-1.5 bg-orange-500 text-white px-2.5 py-1 rounded-md text-xs font-semibold mr-2">
                                        <Award className="w-3 h-3" /> Bronze
                                    </span>
                                )}
                            </div>
                        ))}
                        {rankings.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No contributors yet. Be the first to report an issue!
                            </div>
                        )}
                    </div>
                </div>

                {/* Badges Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-yellow-50 text-yellow-500 flex items-center justify-center mb-4">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Gold Badge</h3>
                        <p className="text-sm text-gray-500">50+ reports</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-4">
                            <Medal className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Silver Badge</h3>
                        <p className="text-sm text-gray-500">30+ reports</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mb-4">
                            <Award className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Bronze Badge</h3>
                        <p className="text-sm text-gray-500">15+ reports</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
                            <Star className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Contributor</h3>
                        <p className="text-sm text-gray-500">5+ reports</p>
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default Leaderboard;

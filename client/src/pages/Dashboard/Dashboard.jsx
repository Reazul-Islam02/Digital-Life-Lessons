import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { FaPlus, FaBook, FaStar, FaCrown, FaGem, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import LessonCard from '../../components/LessonCard';
import StatsCard from '../../components/ui/StatsCard';
import Button from '../../components/ui/Button';

const Dashboard = () => {
    const { userData } = useContext(AuthContext);
    const [premiumShowcase, setPremiumShowcase] = useState([]);
    const [loadingShowcase, setLoadingShowcase] = useState(true);

    useEffect(() => {
        const fetchShowcase = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/lessons?page=1&limit=3`);
                const resData = response.data.data || response.data;
                const lessons = (resData.lessons || []).filter(l => l.accessLevel === 'premium');
                setPremiumShowcase(lessons);
            } catch (error) {
                console.error("Error fetching dashboard showcase:", error);
            } finally {
                setLoadingShowcase(false);
            }
        };

        if (userData?.isPremium) {
            fetchShowcase();
        }
    }, [userData?.isPremium]);

    const stats = [
        {
            label: 'Contributions',
            value: userData?.createdLessons || 0,
            icon: <FaBook size={24} />,
            colorClass: 'bg-primary/10 text-primary'
        },
        {
            label: 'Favorites',
            value: userData?.favorites?.length || 0,
            icon: <FaStar size={24} />,
            colorClass: 'bg-secondary/10 text-secondary'
        },
        {
            label: 'Membership',
            value: userData?.isPremium ? 'Premium' : 'Standard',
            icon: <FaCrown size={24} />,
            colorClass: userData?.isPremium ? 'bg-amber-500/10 text-amber-500' : 'bg-base-200'
        }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            {/* Header section with Premium status */}
            <header className="flex flex-col md:flex-row items-center justify-between gap-8 mb-4">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                        Welcome back, <span className="text-primary">{userData?.name || 'User'}</span>!
                    </h1>
                    <p className="text-base-content/50 font-medium">Continue documenting your legacy and sharing wisdom.</p>
                </div>

                {userData?.isPremium && (
                    <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 shadow-sm animate-in zoom-in duration-500">
                        <FaGem className="text-xl" />
                        <span className="font-bold text-sm tracking-widest uppercase">Premium ARCHIVE MEMBER</span>
                    </div>
                )}
            </header>

            {/* Stats Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <StatsCard key={idx} {...stat} />
                ))}
            </section>

            {/* CTA or Showcase based on Premium status */}
            {!userData?.isPremium ? (
                <section className="bg-gradient-to-r from-primary to-secondary text-white p-10 md:p-16 rounded-2xl relative overflow-hidden group shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl text-center md:text-left">
                            <h2 className="text-3xl font-black mb-4">Evolve Your Journey to Premium</h2>
                            <p className="opacity-80 font-medium mb-0">Join the elite collective. Unlock high-dimensional wisdom and contribute infinitely to the global archive.</p>
                        </div>
                        <Link to="/payment?redirect=/dashboard">
                            <Button variant="secondary" size="lg" className="bg-white text-primary border-none hover:bg-white/90 h-14 px-8 rounded-xl font-bold shadow-lg">
                                Go Premium Now <FaGem className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                </section>
            ) : (
                <section className="space-y-8">
                    <div className="flex items-center justify-between border-b border-base-200 pb-4">
                        <h2 className="text-2xl font-black tracking-tight">Premium Showcase</h2>
                        <Link to="/lessons" className="text-sm font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all">
                            EXPLORE ALL <FaArrowRight size={12} />
                        </Link>
                    </div>

                    {loadingShowcase ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => <div key={i} className="h-96 bg-base-200 rounded-2xl animate-pulse"></div>)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {premiumShowcase.map(lesson => (
                                <LessonCard key={lesson._id} lesson={lesson} />
                            ))}
                        </div>
                    )}
                </section>
            )}

            {/* Quick Actions */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-base-100 border border-base-200 p-8 rounded-2xl hover:shadow-md transition-shadow group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 transition-transform group-hover:rotate-6">
                        <FaBook size={20} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Manage My Archives</h3>
                    <p className="text-base-content/50 text-sm mb-8 leading-relaxed">Master your documented wisdom. View, distill, or refine your existing life lessons.</p>
                    <div className="flex gap-2">
                        <Link to="/dashboard/add-lesson">
                            <Button variant="primary" size="sm" className="rounded-xl px-6">
                                Add New Lesson <FaPlus className="ml-2" size={12} />
                            </Button>
                        </Link>
                        <Link to="/dashboard/my-lessons">
                            <Button variant="ghost" size="sm" className="rounded-xl px-4 border border-base-200 hover:bg-base-200">
                                View My Lessons
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="bg-base-100 border border-base-200 p-8 rounded-2xl hover:shadow-md transition-shadow group">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-6 transition-transform group-hover:rotate-6">
                        <FaStar size={20} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Saved Wisdom</h3>
                    <p className="text-base-content/50 text-sm mb-8 leading-relaxed">Your curated constellation of insights. Revisit the wisdom that resonates most profoundly.</p>
                    <Link to="/dashboard/my-favorites">
                        <Button variant="ghost" size="sm" className="rounded-xl px-6 border border-base-200 hover:bg-secondary/10 hover:text-secondary hover:border-secondary/20">
                            Open Vault <FaArrowRight className="ml-2" size={12} />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;

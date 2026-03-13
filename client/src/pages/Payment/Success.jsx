import { useEffect, useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaRocket, FaGem } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import Lottie from 'lottie-react';
import confettiAnimation from '../../assets/confetti.json';
import LessonCard from '../../components/LessonCard';
import Button from '../../components/ui/Button';

const Success = () => {
    const { user, loading, refetchUser, userData } = useContext(AuthContext);
    const [premiumLessons, setPremiumLessons] = useState([]);
    const [loadingLessons, setLoadingLessons] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const redirectUrl = queryParams.get('redirect') || '/dashboard';

    useEffect(() => {
        if (loading) return;

        const verifyPayment = async () => {
            if (!user) return;
            try {
                const token = await user.getIdToken();
                await axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Refresh the global user data to show Premium badge immediately
                refetchUser();

                // Redirect after a short delay to let them see the success message
                setTimeout(() => {
                    navigate(redirectUrl);
                }, 8000);
            } catch (error) {
                console.error('Payment verification failed:', error);
            }
        };

        const fetchPremiumLessons = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/lessons?page=1&limit=3`);
                const data = response.data.data?.lessons || response.data.lessons || [];
                // Filter only premium ones
                const lessons = data.filter(l => l.accessLevel === 'premium');
                setPremiumLessons(lessons);
            } catch (error) {
                console.error('Error fetching showcase lessons:', error);
            } finally {
                setLoadingLessons(false);
            }
        };

        verifyPayment();
        fetchPremiumLessons();
    }, [user, loading, refetchUser, navigate, redirectUrl]);

    return (
        <div className="max-w-5xl mx-auto py-20 px-4 space-y-24 relative overflow-hidden">
            {/* Celebration Animation (if assets exist) */}
            {confettiAnimation && (
                <div className="fixed inset-0 pointer-events-none z-50">
                    <Lottie
                        animationData={confettiAnimation}
                        loop={false}
                        className="w-full h-full"
                    />
                </div>
            )}

            <div className="text-center space-y-8 animate-in zoom-in duration-700">
                <div className="relative inline-block">
                    <div className="w-32 h-32 bg-success/10 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-success/10 border-4 border-success/20">
                        <FaCheckCircle className="text-6xl text-success" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-amber-500 text-white p-3 rounded-2xl shadow-xl animate-bounce">
                        <FaGem size={24} />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tightest leading-none">
                        Welcome to the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 italic">Inner Circle</span>
                    </h1>
                    <p className="text-xl text-base-content/50 max-w-2xl mx-auto font-medium leading-relaxed">
                        Your <span className="text-amber-500 font-bold">Premium Lifetime Membership</span> is now active. The full legacy of human wisdom is now yours to explore without limits.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-6 pt-4">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to={redirectUrl}>
                            <Button variant="primary" size="lg" className="rounded-xl px-12 h-16 font-black text-xl shadow-xl shadow-primary/20">
                                Return to Archive
                            </Button>
                        </Link>
                        <Link to="/lessons">
                            <Button variant="outline" size="lg" className="rounded-xl px-12 h-16 border-2 font-black text-xl">
                                Explore Library
                            </Button>
                        </Link>
                    </div>
                    <p className="text-base-content/30 font-bold tracking-widest uppercase text-xs">
                        Redirecting you shortly...
                    </p>
                </div>
            </div>

            <section className="space-y-10">
                <div className="border-b border-base-200 pb-4">
                    <h2 className="text-2xl font-black text-primary uppercase tracking-tight">Unlocked Excellence</h2>
                    <p className="text-base-content/40 font-medium">Start your premium journey with these immediate insights.</p>
                </div>

                {loadingLessons ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => <div key={i} className="h-96 bg-base-200 rounded-3xl animate-pulse"></div>)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {premiumLessons.length > 0 ? (
                            premiumLessons.map(lesson => (
                                <LessonCard key={lesson._id} lesson={lesson} />
                            ))
                        ) : (
                            <div className="col-span-full py-20 bg-base-200/20 rounded-3xl text-center border-2 border-dashed border-base-200">
                                <p className="text-base-content/30 font-black tracking-widest uppercase">Fetching Exclusive Content...</p>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Success;

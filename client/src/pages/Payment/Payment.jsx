import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { auth } from '../../firebase';
import toast from 'react-hot-toast';
import { useLocation, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { FaGem, FaCheckCircle, FaCrown, FaStar, FaShieldAlt, FaArrowRight } from 'react-icons/fa';

const Payment = () => {
    const { userData } = useContext(AuthContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirectUrl = queryParams.get('redirect') || '/dashboard';

    const handleCheckout = async () => {
        if (!auth.currentUser) {
            toast.error('Please login to upgrade');
            return;
        }
        try {
            const token = await auth.currentUser.getIdToken();
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
                redirectUrl: redirectUrl
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const url = response.data.data?.url || response.data.url;
            window.location.href = url;
        } catch (error) {
            console.error(error);
            toast.error('Payment initiation failed');
        }
    };

    if (userData?.isPremium) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center text-white text-5xl shadow-xl shadow-amber-500/20">
                    <FaCrown />
                </div>
                <div className="space-y-2">
                    <h2 className="text-4xl font-black tracking-tight">You are Premium!</h2>
                    <p className="text-base-content/50 font-medium">Thank you for your support. Your lifetime access is active.</p>
                </div>
                <Link to="/dashboard">
                    <Button variant="primary" size="lg" className="rounded-xl px-12">
                        Back to Dashboard
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-16 pb-20">
            <header className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight">Evolve Your <span className="text-primary">Journey</span></h1>
                <p className="text-lg text-base-content/50 max-w-2xl mx-auto font-medium leading-relaxed">
                    Unlock exclusive insights and share unlimited wisdom with our community of lifelong learners.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Standard Plan */}
                <div className="bg-base-100 border border-base-200 rounded-3xl p-10 flex flex-col justify-between hover:shadow-md transition-shadow group">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-black mb-1">Standard</h2>
                            <p className="text-base-content/40 text-sm font-bold uppercase tracking-widest">For Enthusiasts</p>
                        </div>

                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-black">$0</span>
                            <span className="text-base-content/40 font-bold">/forever</span>
                        </div>

                        <ul className="space-y-4">
                            {[
                                'Access all public lessons',
                                'Create up to 5 lessons',
                                'Join global discussions',
                                'Community bookmarks'
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                                    <FaCheckCircle className="text-success" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Button variant="ghost" className="w-full mt-10 rounded-xl border border-base-200 bg-base-200/50 pointer-events-none opacity-50">
                        Current Plan
                    </Button>
                </div>

                {/* Premium Plan */}
                <div className="bg-base-100 border-2 border-primary rounded-3xl p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 bg-primary text-white py-2 px-8 rounded-bl-2xl font-black text-[10px] tracking-widest uppercase shadow-lg">
                        Recommended
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-black mb-1 text-primary">Premium Lifetime</h2>
                            <p className="text-primary/60 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                <FaGem size={10} /> The Inner Circle
                            </p>
                        </div>

                        <div className="flex items-baseline gap-1">
                            <span className="text-6xl font-black text-primary">$15</span>
                            <span className="text-base-content/40 font-bold">/one-time</span>
                        </div>

                        <ul className="space-y-4">
                            {[
                                'Unlimited lesson creation',
                                'Full access to premium content',
                                'Official Premium Profile Badge',
                                'Priority archive placement',
                                'Exclusive wisdom newsletter'
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-bold">
                                    <FaStar className="text-amber-500 animate-pulse" />
                                    <span className="text-base-content/80">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Button
                        onClick={handleCheckout}
                        variant="primary"
                        size="lg"
                        className="w-full mt-10 rounded-xl font-black text-lg h-16 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-transform"
                    >
                        Unlock Premium Access <FaArrowRight className="ml-2" />
                    </Button>
                </div>
            </div>

            <section className="bg-base-200/50 p-8 rounded-2xl flex flex-wrap items-center justify-center gap-12 text-base-content/30 grayscale opacity-50 font-black text-[10px] tracking-[0.3em] uppercase">
                <div className="flex items-center gap-2"><FaShieldAlt /> Secure Payments</div>
                <div className="flex items-center gap-2"><FaCheckCircle /> Lifetime Value</div>
                <div className="flex items-center gap-2"><FaShieldAlt /> Encrypted Access</div>
            </section>
        </div>
    );
};

export default Payment;

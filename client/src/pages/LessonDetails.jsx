import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import { auth } from '../firebase';
import { FaHeart, FaRegHeart, FaArrowLeft, FaGem, FaCalendarAlt, FaTag, FaCheckCircle, FaLock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const LessonDetails = () => {
    const { id } = useParams();
    const { user, userData } = useContext(AuthContext);
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/lessons/${id}`);
                const data = response.data.data?.lesson || response.data;
                setLesson(data);

                // Check if favorite
                if (userData?.favorites?.includes(id)) {
                    setIsFavorite(true);
                }
            } catch (error) {
                console.error('Error fetching lesson:', error);
                toast.error('Failed to load lesson details');
            } finally {
                setLoading(false);
            }
        };
        fetchLesson();
    }, [id, userData]);

    const handleFavorite = async () => {
        if (!user) {
            toast.error('Please login to favorite lessons');
            return navigate('/login');
        }

        try {
            const token = await auth.currentUser.getIdToken();
            await axios.post(`${import.meta.env.VITE_API_URL}/users/favorites/toggle`, {
                lessonId: id
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setIsFavorite(!isFavorite);
            toast.success(!isFavorite ? 'Saved to favorites' : 'Removed from favorites');
        } catch (error) {
            console.error('Error toggling favorite:', error);
            toast.error('Something went wrong');
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-primary font-bold tracking-widest uppercase text-xs">Unlocking wisdom...</p>
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-black mb-4">Lesson not found</h2>
                <Link to="/lessons">
                    <Button variant="primary">Back to Archive</Button>
                </Link>
            </div>
        );
    }

    const canAccess = lesson.accessLevel === 'free' || userData?.isPremium || userData?.role === 'admin';

    return (
        <div className="max-w-5xl mx-auto pb-20 space-y-12">
            {/* Navigation and Actions */}
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="rounded-xl border border-base-200 hover:bg-base-200"
                >
                    <FaArrowLeft className="mr-2" /> Back
                </Button>

                <div className="flex items-center gap-3">
                    <Button
                        onClick={handleFavorite}
                        variant="ghost"
                        className={`rounded-xl border border-base-200 ${isFavorite ? 'text-error bg-error/5 border-error/10' : 'hover:bg-error/5 hover:text-error'}`}
                    >
                        {isFavorite ? <FaHeart className="mr-2" /> : <FaRegHeart className="mr-2" />}
                        {isFavorite ? 'Saved' : 'Save'}
                    </Button>
                </div>
            </div>

            {/* Hero Image Section */}
            <div className="relative rounded-3xl overflow-hidden aspect-[16/9] shadow-2xl border-4 border-base-200">
                <img
                    src={lesson.imageURL || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1673&auto=format&fit=crop'}
                    alt={lesson.title}
                    className={`w-full h-full object-cover transition-all duration-1000 ${!canAccess ? 'blur-md grayscale brightness-50' : 'hover:scale-[1.02]'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start gap-4 text-white">
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="primary" className="shadow-lg uppercase text-[10px] tracking-wider border-none">
                            {lesson.category}
                        </Badge>
                        {lesson.accessLevel === 'premium' && (
                            <Badge className="bg-amber-500 text-white shadow-lg uppercase text-[10px] tracking-wider border-none">
                                Premium ⭐
                            </Badge>
                        )}
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight drop-shadow-lg tracking-tight">
                        {lesson.title}
                    </h1>
                </div>

                {!canAccess && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl space-y-6 max-w-md animate-in zoom-in duration-500">
                            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto text-white text-3xl shadow-lg">
                                <FaLock />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white mb-2">Exclusive Wisdom</h2>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    This lesson contains deep realizations reserved for our premium members. Evolve your journey to unlock this experience.
                                </p>
                            </div>
                            <Link to={`/payment?redirect=/lessons/${id}`}>
                                <Button variant="secondary" className="w-full bg-amber-500 text-white border-none hover:bg-amber-600 rounded-xl font-bold h-12 shadow-lg">
                                    Unlock Now with Premium <FaGem className="ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Lesson Body */}
                <div className="lg:col-span-2 space-y-12">
                    {canAccess ? (
                        <article className="prose prose-lg max-w-none text-base-content/80 font-medium leading-relaxed bg-base-100 border border-base-200 p-8 md:p-12 rounded-3xl shadow-sm">
                            <div className="relative">
                                <span className="absolute -left-4 -top-4 text-6xl text-primary/10 font-serif">"</span>
                                <div className="whitespace-pre-wrap text-xl indent-4 lg:text-2xl italic tracking-tight font-serif">
                                    {lesson.description}
                                </div>
                                <span className="absolute -right-4 -bottom-4 text-6xl text-secondary/10 font-serif text-right block w-full">"</span>
                            </div>
                        </article>
                    ) : (
                        <div className="h-64 bg-base-200/50 rounded-3xl border border-dashed border-base-300 flex items-center justify-center text-base-content/20 italic font-bold">
                            [ Locked Content ]
                        </div>
                    )}

                    <div className="flex flex-wrap gap-8 py-6 px-8 bg-base-200/30 rounded-2xl border border-base-200 text-xs font-bold uppercase tracking-widest text-base-content/40">
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-primary" />
                            <span>Published: {new Date(lesson.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaTag className="text-secondary" />
                            <span>Domain: {lesson.category} / {lesson.emotionalTone}</span>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <aside className="space-y-8">
                    <div className="bg-base-100 border border-base-200 p-8 rounded-3xl shadow-sm space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-base-content/40 mb-2">Curated By</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-primary/20">
                                {lesson.creatorPhoto ? (
                                    <img src={lesson.creatorPhoto} alt={lesson.creatorName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center font-bold text-primary bg-primary/5 text-xl">
                                        {lesson.creatorName?.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="font-black text-base-content leading-tight mb-1">{lesson.creatorName}</p>
                                <p className="text-[10px] uppercase font-bold text-primary tracking-wider">Wisdom Custodian</p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-base-200 space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-widest text-base-content/40">Experience Details</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-base-content/50">Tone</span>
                                    <span className="font-bold">{lesson.emotionalTone}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-base-content/50">Access</span>
                                    <span className="font-bold flex items-center gap-1">
                                        {lesson.accessLevel === 'premium' ? <><FaGem className="text-amber-500" /> Premium</> : 'Free'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-base-content/50">Engagement</span>
                                    <span className="font-bold flex items-center gap-1">
                                        <FaCheckCircle className="text-success" /> Verified Source
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link to="/lessons">
                        <Button variant="ghost" className="w-full rounded-2xl border border-base-200 font-bold h-12">
                            Explore More Lessons
                        </Button>
                    </Link>
                </aside>
            </div>
        </div>
    );
};

export default LessonDetails;

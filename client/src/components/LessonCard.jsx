import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FaHeart, FaRegHeart, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { auth } from '../firebase';
import toast from 'react-hot-toast';
import Badge from './ui/Badge';
import Button from './ui/Button';

const LessonCard = ({ lesson }) => {
    const { user, userData, refetchUser } = useContext(AuthContext);
    const isPremium = lesson.accessLevel === 'premium';
    const canAccess = !isPremium || userData?.isPremium || userData?.role === 'admin';
    const isFavorite = userData?.favorites?.includes(lesson._id);

    const handleFavorite = async (e) => {
        e.preventDefault();
        if (!user) {
            return toast.error('Please login to save favorites');
        }
        try {
            const token = await auth.currentUser.getIdToken();
            await axios.post(`${import.meta.env.VITE_API_URL}/users/favorites/toggle`,
                { lessonId: lesson._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            refetchUser();
            toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <div className="group relative bg-base-100 border border-base-200 shadow-premium hover:shadow-premium-hover transition-all duration-500 rounded-2xl overflow-hidden flex flex-col h-full">
            {/* Image Section */}
            <figure className="relative h-56 overflow-hidden">
                <img
                    src={lesson.imageURL || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1673&auto=format&fit=crop'}
                    alt={lesson.title}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${!canAccess ? 'blur-sm brightness-75' : ''}`}
                />

                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    <Badge variant="primary" className="shadow-lg uppercase text-[10px] tracking-wider">
                        {lesson.category}
                    </Badge>
                    {isPremium && (
                        <Badge variant="secondary" className="shadow-lg uppercase text-[10px] tracking-wider">
                            Premium ⭐
                        </Badge>
                    )}
                </div>

                {/* Favorite Button */}
                <button
                    onClick={handleFavorite}
                    className={`absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${isFavorite
                        ? 'bg-error text-white shadow-lg'
                        : 'bg-white/20 text-white hover:bg-white hover:text-error'
                        }`}
                >
                    {isFavorite ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                </button>

                {/* Locked Content Overlay */}
                {!canAccess && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-300">
                        <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-2">
                            <FaLock className="text-white text-xl" />
                        </div>
                        <span className="text-white font-bold text-xs uppercase tracking-widest">Locked Content</span>
                    </div>
                )}
            </figure>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-2 py-1 rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                        {lesson.emotionalTone}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-base-content mb-2 line-clamp-2 min-h-[3.5rem] leading-tight">
                    {lesson.title}
                </h3>

                <p className="text-sm text-base-content/60 mb-6 line-clamp-3">
                    {lesson.description}
                </p>

                {/* Footer info */}
                <div className="mt-auto pt-4 border-t border-base-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/20 bg-base-200">
                            {lesson.creatorPhoto ? (
                                <img src={lesson.creatorPhoto} alt={lesson.creatorName} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center font-bold text-primary italic">
                                    {lesson.creatorName?.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-base-content">{lesson.creatorName}</span>
                            <span className="text-[10px] text-base-content/40">{new Date(lesson.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {canAccess ? (
                            <Link to={`/lessons/${lesson._id}`}>
                                <Button size="sm" variant="primary" className="rounded-xl px-5">
                                    Explore
                                </Button>
                            </Link>
                        ) : (
                            <Link to={`/payment?redirect=${window.location.pathname}`}>
                                <Button size="sm" variant="secondary" className="rounded-xl px-5">
                                    Unlock
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonCard;

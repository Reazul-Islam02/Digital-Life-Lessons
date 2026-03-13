import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { auth } from '../../firebase';
import LessonCard from '../../components/LessonCard';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const Favorites = () => {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user?.email) return;
            try {
                const token = await auth.currentUser.getIdToken();
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/favorites`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Handle refactored API response robustly
                const resData = response.data.data || response.data;
                const favoritesList = resData.favorites || (Array.isArray(resData) ? resData : []);
                setFavorites(favoritesList);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, [user]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight">Your Wisdom <span className="text-secondary">Vault</span></h1>
                <p className="text-base-content/50 max-w-xl mx-auto font-medium">A curated space for the lessons that resonated with you the most. Revisit these insights whenever you need a boost.</p>
            </div>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-base-200/50 rounded-3xl border-2 border-dashed border-base-300">
                    <div className="text-7xl mb-6 opacity-20">💝</div>
                    <h3 className="text-2xl font-bold mb-2">Your collection is empty</h3>
                    <p className="text-base-content/40 max-w-sm mx-auto mb-8 font-medium">
                        Explore the library and favorite lessons that touch your heart to see them here.
                    </p>
                    <Link to="/lessons">
                        <Button variant="primary" size="lg" className="rounded-xl px-12">
                            Explore Archive
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favorites.map(lesson => (
                        <LessonCard key={lesson._id} lesson={lesson} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;

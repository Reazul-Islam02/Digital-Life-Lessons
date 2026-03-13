import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaTrash, FaEdit, FaPlus, FaEye } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const MyLessons = () => {
    const { user } = useContext(AuthContext);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyLessons = async () => {
            if (!user?.email) return;
            try {
                const token = await auth.currentUser.getIdToken();
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/my-lessons`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Adjusted to handle refactored backend response structure robustly
                const resData = response.data.data || response.data;
                const lessonsList = resData.lessons || (Array.isArray(resData) ? resData : []);
                setLessons(lessonsList);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load lessons');
            } finally {
                setLoading(false);
            }
        };
        fetchMyLessons();
    }, [user]);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this lesson?')) return;
        try {
            const token = await auth.currentUser.getIdToken();
            await axios.delete(`${import.meta.env.VITE_API_URL}/lessons/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLessons(lessons.filter(lesson => lesson._id !== id));
            toast.success('Lesson deleted');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete lesson');
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto space-y-10 pb-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">My Wisdom Vault</h1>
                    <p className="text-base-content/50 font-medium">Manage and monitor the impact of your shared lessons.</p>
                </div>
                <Link to="/dashboard/add-lesson">
                    <Button variant="primary" className="rounded-xl px-8 h-12 shadow-lg shadow-primary/20">
                        <FaPlus className="mr-2" /> New Lesson
                    </Button>
                </Link>
            </div>

            {lessons.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-base-200/50 rounded-3xl border-2 border-dashed border-base-300">
                    <div className="text-6xl mb-6 opacity-20">📜</div>
                    <h3 className="text-2xl font-bold mb-2">No lessons published yet</h3>
                    <p className="text-base-content/50 max-w-sm mx-auto mb-8 font-medium">
                        The world is waiting for your story. Start by creating your very first life lesson.
                    </p>
                    <Link to="/dashboard/add-lesson">
                        <Button variant="primary" size="lg" className="rounded-xl px-12">
                            Begin Your Legacy
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100 border border-base-200 rounded-2xl shadow-sm">
                    <table className="table table-lg w-full">
                        <thead>
                            <tr className="bg-base-200/50 text-base-content/60 uppercase text-[10px] tracking-widest font-black">
                                <th className="py-4 px-6">Lesson</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Access</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lessons.map(lesson => (
                                <tr key={lesson._id} className="hover:bg-base-200/30 transition-colors border-b border-base-200 last:border-0">
                                    <td className="py-5 px-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-base-200 border border-base-300">
                                                <img
                                                    src={lesson.imageURL || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=100&auto=format&fit=crop'}
                                                    alt={lesson.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-bold text-base line-clamp-1 mb-1">{lesson.title}</div>
                                                <div className="text-[10px] font-bold text-base-content/40 uppercase tracking-wider">
                                                    {new Date(lesson.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Badge variant="ghost" className="border-primary/20 text-primary capitalize">
                                            {lesson.category}
                                        </Badge>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${lesson.visibility === 'public' ? 'bg-success animate-pulse' : 'bg-base-content/20'}`}></div>
                                            <span className={`text-[11px] font-bold uppercase tracking-wider ${lesson.visibility === 'public' ? 'text-success' : 'text-base-content/40'}`}>
                                                {lesson.visibility}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        {lesson.accessLevel === 'premium' ? (
                                            <Badge variant="secondary" className="px-3">Premium ⭐</Badge>
                                        ) : (
                                            <span className="text-xs font-bold text-base-content/40">Free Access</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex justify-center gap-2">
                                            <Link to={`/lessons/${lesson._id}`} title="View">
                                                <Button variant="ghost" size="sm" className="btn-circle bg-base-200/50 hover:text-primary">
                                                    <FaEye size={16} />
                                                </Button>
                                            </Link>
                                            <Link to={`/dashboard/edit-lesson/${lesson._id}`} title="Edit">
                                                <Button variant="ghost" size="sm" className="btn-circle bg-base-200/50 hover:text-info">
                                                    <FaEdit size={16} />
                                                </Button>
                                            </Link>
                                            <Button
                                                onClick={() => handleDelete(lesson._id)}
                                                variant="ghost"
                                                size="sm"
                                                className="btn-circle bg-base-200/50 hover:text-error"
                                                title="Delete"
                                            >
                                                <FaTrash size={16} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyLessons;

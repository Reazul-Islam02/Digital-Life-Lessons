import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
import { auth } from '../../firebase';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { FaBook, FaSmile, FaImage, FaEye, FaLock, FaArrowRight, FaUndo } from 'react-icons/fa';

const EditLesson = () => {
    const { id } = useParams();
    const { user, userData } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/lessons/${id}`);
                // Handling refactored API
                const data = response.data.data?.lesson || response.data;
                setLesson(data);

                // Security check: only allow owner or admin to edit
                if (data.creatorEmail !== user?.email && userData?.role !== 'admin') {
                    toast.error("You don't have permission to edit this lesson");
                    navigate('/dashboard/my-lessons');
                }
            } catch (error) {
                console.error('Error fetching lesson:', error);
                toast.error('Failed to load lesson for editing');
            } finally {
                setLoading(false);
            }
        };
        if (user?.email) fetchLesson();
    }, [id, user, userData, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedData = {
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            emotionalTone: form.emotionalTone.value,
            imageURL: form.imageURL.value,
            visibility: form.visibility.value,
            accessLevel: form.accessLevel.value,
        };

        setSubmitting(true);
        try {
            const token = await auth.currentUser.getIdToken();
            await axios.put(`${import.meta.env.VITE_API_URL}/lessons/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Lesson updated successfully!');
            navigate('/dashboard/my-lessons');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update lesson');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-primary font-bold tracking-widest uppercase text-xs">Loading wisdom...</p>
        </div>
    );

    if (!lesson) return <div className="text-center py-20 font-bold">Lesson not found</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight">Refine Your <span className="text-primary">Wisdom</span></h1>
                <p className="text-base-content/50 max-w-xl mx-auto font-medium">Update your lesson to better reflect your growth and insights. Every story can be improved.</p>
            </div>

            <div className="bg-base-100 border border-base-200 rounded-3xl shadow-premium overflow-hidden">
                <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-10">
                    {/* Section 1: Core Content */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-base-200 pb-4">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black text-sm">01</div>
                            <h3 className="font-black text-lg uppercase tracking-tight">The Essence</h3>
                        </div>

                        <Input
                            label="Lesson Title"
                            name="title"
                            defaultValue={lesson.title}
                            placeholder="e.g., The Stoic Way to Modern Peace"
                            icon={FaBook}
                            required
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-black text-base-content/60 uppercase tracking-widest ml-1">Deep Narrative</label>
                            <textarea
                                name="description"
                                defaultValue={lesson.description}
                                placeholder="What's the core of your lesson?..."
                                className="textarea textarea-bordered w-full rounded-xl border-2 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium h-48 py-4 px-5 text-lg leading-relaxed"
                                required
                            ></textarea>
                        </div>
                    </div>

                    {/* Section 2: Classification */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-base-200 pb-4">
                            <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary font-black text-sm">02</div>
                            <h3 className="font-black text-lg uppercase tracking-tight">Context & Mood</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-base-content/60 uppercase tracking-widest ml-1">Category</label>
                                <select name="category" className="select select-bordered w-full rounded-xl border-2 font-bold h-14" defaultValue={lesson.category}>
                                    <option>Mindfulness</option>
                                    <option>Relationships</option>
                                    <option>Career</option>
                                    <option>Health</option>
                                    <option>Lifestyle</option>
                                    <option>Travel</option>
                                    <option>Personal Growth</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-base-content/60 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <FaSmile className="text-secondary" /> Emotional Tone
                                </label>
                                <select name="emotionalTone" className="select select-bordered w-full rounded-xl border-2 font-bold h-14" defaultValue={lesson.emotionalTone}>
                                    <option>Inspirational</option>
                                    <option>Reflective</option>
                                    <option>Empowering</option>
                                    <option>Peaceful</option>
                                    <option>Serious</option>
                                    <option>Humorous</option>
                                    <option>Motivational</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Visuals & Privacy */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-base-200 pb-4">
                            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-black text-sm">03</div>
                            <h3 className="font-black text-lg uppercase tracking-tight">Delivery & Access</h3>
                        </div>

                        <Input
                            label="Cover Image URL"
                            name="imageURL"
                            defaultValue={lesson.imageURL}
                            placeholder="https://images.unsplash.com/..."
                            icon={FaImage}
                            type="url"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-base-content/60 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <FaEye className="text-primary" /> Visibility
                                </label>
                                <select name="visibility" className="select select-bordered w-full rounded-xl border-2 font-bold h-14" defaultValue={lesson.visibility}>
                                    <option value="public">Public (Everyone can see list)</option>
                                    <option value="private">Private (Only you can see)</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-base-content/60 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <FaLock className="text-amber-500" /> Access Tier
                                </label>
                                <select name="accessLevel" className="select select-bordered w-full rounded-xl border-2 font-bold h-14" defaultValue={lesson.accessLevel}>
                                    <option value="free">Free for All</option>
                                    <option value="premium">Premium Only ⭐</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex flex-col sm:flex-row gap-4">
                        <Button
                            type="submit"
                            variant="primary"
                            loading={submitting}
                            className="flex-grow h-16 rounded-2xl text-xl font-black shadow-xl shadow-primary/20"
                        >
                            Save Improvements <FaArrowRight className="ml-2" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate('/dashboard/my-lessons')}
                            className="h-16 rounded-2xl px-8 border border-base-200 font-bold hover:bg-base-200"
                        >
                            <FaUndo className="mr-2" /> Discard
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditLesson;

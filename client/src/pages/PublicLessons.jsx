import { useState, useEffect } from 'react';
import axios from 'axios';
import LessonCard from '../components/LessonCard';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const PublicLessons = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        emotionalTone: '',
    });
    const [totalPages, setTotalPages] = useState(1);

    const fetchLessons = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams({
                page,
                limit: 9,
                ...filters
            }).toString();

            const res = await axios.get(`${import.meta.env.VITE_API_URL}/lessons?${query}`);
            // Handling refactored API response
            const data = res.data.data || res.data;
            setLessons(data.lessons || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error("Error fetching lessons", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchLessons();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [page, filters.category, filters.emotionalTone, filters.search]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-16 pb-20">
            {/* Header Section */}
            <section className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight">The Wisdom <span className="text-primary">Archive</span></h1>
                <p className="text-lg text-base-content/50 max-w-2xl mx-auto font-medium">
                    Explore centuries of collective human experience, distilled into actionable insights for the modern seeker.
                </p>
            </section>

            {/* Filters Section */}
            <section className="bg-base-100/80 backdrop-blur-xl p-3 md:p-4 rounded-[2.5rem] border border-base-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] sticky top-24 z-40 max-w-6xl mx-auto ring-1 ring-black/5">
                <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 items-center">
                    <div className="flex-[3] w-full">
                        <Input
                            icon={FaSearch}
                            placeholder="Explore by title, keyword, or insight..."
                            value={filters.search}
                            onChange={(e) => {
                                setFilters({ ...filters, search: e.target.value });
                                setPage(1);
                            }}
                            className="h-16 rounded-3xl border-none bg-base-200/50 focus:bg-base-100 transition-all text-lg pl-14"
                        />
                    </div>

                    <div className="flex flex-[2] flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        <div className="flex-1 w-full lg:w-48">
                            <select
                                className="select select-bordered w-full h-16 rounded-3xl border-none bg-base-200/50 hover:bg-base-200 transition-all font-bold px-6 text-base-content/70 focus:outline-none"
                                value={filters.category}
                                onChange={(e) => {
                                    setFilters({ ...filters, category: e.target.value });
                                    setPage(1);
                                }}
                            >
                                <option value="">All Categories</option>
                                <option value="Mindfulness">Mindfulness</option>
                                <option value="Relationships">Relationships</option>
                                <option value="Career">Career</option>
                                <option value="Health">Health</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="Travel">Travel</option>
                            </select>
                        </div>

                        <div className="flex-1 w-full lg:w-48">
                            <select
                                className="select select-bordered w-full h-16 rounded-3xl border-none bg-base-200/50 hover:bg-base-200 transition-all font-bold px-6 text-base-content/70 focus:outline-none"
                                value={filters.emotionalTone}
                                onChange={(e) => {
                                    setFilters({ ...filters, emotionalTone: e.target.value });
                                    setPage(1);
                                }}
                            >
                                <option value="">All Tones</option>
                                <option value="Inspirational">Inspirational</option>
                                <option value="Reflective">Reflective</option>
                                <option value="Empowering">Empowering</option>
                                <option value="Peaceful">Peaceful</option>
                                <option value="Serious">Serious</option>
                                <option value="Humorous">Humorous</option>
                            </select>
                        </div>

                        <Button type="submit" variant="primary" className="h-16 px-10 rounded-3xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 flex items-center gap-2 whitespace-nowrap">
                            <span className="lg:hidden">Search</span>
                            <span className="hidden lg:inline">Find Wisdom</span>
                        </Button>
                    </div>
                </form>
            </section>

            {/* Results Grid */}
            <section>
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-96 bg-base-200 rounded-2xl animate-pulse"></div>)}
                    </div>
                ) : lessons.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {lessons.map(lesson => (
                            <LessonCard key={lesson._id} lesson={lesson} />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <div className="text-6xl mb-4 opacity-20">🕯️</div>
                        <h3 className="text-2xl font-bold mb-2">No results found</h3>
                        <p className="text-base-content/40 max-w-sm mx-auto">Try adjusting your filters to find the wisdom you seek.</p>
                        <Button
                            variant="ghost"
                            className="mt-6 border border-base-200"
                            onClick={() => {
                                setFilters({ search: '', category: '', emotionalTone: '' });
                                setPage(1);
                            }}
                        >
                            Reset Filters
                        </Button>
                    </div>
                )}
            </section>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
                <section className="flex justify-center">
                    <div className="join bg-base-200 p-1 rounded-2xl">
                        <button
                            className="join-item btn btn-md bg-transparent border-none hover:bg-base-300 rounded-xl"
                            disabled={page === 1}
                            onClick={() => {
                                setPage(prev => Math.max(1, prev - 1));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            Prev
                        </button>
                        <div className="join-item btn btn-md bg-primary text-white border-none rounded-xl mx-1 pointer-events-none px-6">
                            {page} of {totalPages}
                        </div>
                        <button
                            className="join-item btn btn-md bg-transparent border-none hover:bg-base-300 rounded-xl"
                            disabled={page >= totalPages}
                            onClick={() => {
                                setPage(prev => prev + 1);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            Next
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
};

export default PublicLessons;

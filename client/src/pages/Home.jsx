import { Link } from 'react-router-dom';
import LessonCard from '../components/LessonCard';
import Button from '../components/ui/Button';
import { FaArrowRight, FaQuoteLeft, FaUsers, FaBookOpen, FaLightbulb } from 'react-icons/fa';

const Home = () => {
    const featuredLessons = [
        {
            _id: '1',
            title: 'The Hidden Power of Daily Reflection',
            description: 'Discover how 10 minutes of intentional stillness can reshape your perspective and lead to profound personal growth.',
            imageURL: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000',
            category: 'Mindfulness',
            emotionalTone: 'Peaceful',
            creatorName: 'Elena Vance',
            createdAt: new Date(),
            accessLevel: 'public'
        },
        {
            _id: '2',
            title: 'Resilience in the Face of Career Setbacks',
            description: 'A deep dive into turning failures into stepping stones for a more meaningful professional journey.',
            imageURL: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000',
            category: 'Career',
            emotionalTone: 'Empowering',
            creatorName: 'Marcus Thorne',
            createdAt: new Date(),
            accessLevel: 'premium'
        },
        {
            _id: '3',
            title: 'Lessons from the Quietest Corners of the World',
            description: 'What solo travel across remote landscapes taught me about the universal language of human kindness.',
            imageURL: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1000',
            category: 'Travel',
            emotionalTone: 'Inspirational',
            creatorName: 'Sarah Jenkins',
            createdAt: new Date(),
            accessLevel: 'public'
        }
    ];

    return (
        <div className="space-y-24 md:space-y-32 pb-20">
            {/* Hero Section */}
            <section className="relative pt-8 md:pt-16 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full -z-10">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-20 right-0 w-84 h-84 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-500"></div>
                </div>

                <div className="text-center max-w-4xl mx-auto px-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-8 border border-primary/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Wisdom Shared Globally
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-base-content leading-[1.1] mb-8">
                        Preserve Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Life Lessons
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-base-content/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Every scar tells a story, and every story carries a lesson. Join our community of explorers sharing authentic human wisdom.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/lessons">
                            <Button variant="ghost" size="lg" className="px-10 h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] hover:shadow-primary/30 active:scale-[0.98] transition-all duration-300 border-none">
                                Explore Archive <FaArrowRight className="ml-2" />
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="outline" size="lg" className="px-10 h-16 rounded-2xl">
                                Join Community
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-16 flex items-center justify-center gap-8 md:gap-16">
                        <div className="text-center">
                            <p className="text-3xl font-black">50k+</p>
                            <p className="text-[10px] uppercase tracking-widest text-base-content/40 font-bold">Lessons</p>
                        </div>
                        <div className="w-px h-10 bg-base-200"></div>
                        <div className="text-center">
                            <p className="text-3xl font-black">120k</p>
                            <p className="text-[10px] uppercase tracking-widest text-base-content/40 font-bold">Wise Souls</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Lessons Section */}
            <section className="container mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-4">Curated Wisdom</h2>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tight">
                            Featured <span className="text-base-content/30 italic">Insights</span>
                        </h3>
                    </div>
                    <Link to="/lessons" className="group text-sm font-bold flex items-center gap-2 text-primary hover:gap-3 transition-all">
                        VIEW ALL LESSONS <FaArrowRight />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredLessons.map((lesson) => (
                        <LessonCard key={lesson._id} lesson={lesson} />
                    ))}
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="bg-base-200 py-24 rounded-3xl mx-4 sm:mx-0">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-primary tracking-[0.3em] uppercase mb-4">Our Values</h2>
                        <h3 className="text-4xl font-black tracking-tight">The Pillars of Wisdom</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: <FaBookOpen className="text-primary" size={32} />, title: "Preservation", text: "We believe important life experiences should never be lost to time." },
                            { icon: <FaLightbulb className="text-secondary" size={32} />, title: "Authenticity", text: "Raw, honest stories from real people about what truly matters." },
                            { icon: <FaUsers className="text-accent" size={32} />, title: "Connection", text: "Bridging generations through shared human experiences." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-base-100 p-8 rounded-2xl border border-base-300 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                                <div className="mb-6 p-4 rounded-xl bg-base-200">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                                <p className="text-sm text-base-content/60 leading-relaxed font-medium">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="max-w-4xl mx-auto px-6 text-center">
                <FaQuoteLeft className="text-primary/20 mx-auto mb-8" size={64} />
                <h3 className="text-2xl md:text-4xl font-bold italic tracking-tight text-base-content/80 leading-snug mb-8">
                    "Life Lesson Archive gave me a space to process my own journey while helping others navigate theirs. It's more than a blog; it's a collective memory of the human spirit."
                </h3>
                <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full overflow-hidden mb-3 border-2 border-primary/20 p-0.5">
                        <img src="https://i.pravatar.cc/150?img=33" alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <p className="font-bold">Jonathan Reed</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-primary">Premium Guardian</p>
                </div>
            </section>

            {/* Final CTA */}
            <section className="px-4">
                <div className="bg-primary text-white rounded-3xl p-12 md:p-24 text-center relative overflow-hidden group shadow-2xl shadow-primary/30">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] -mr-48 -mt-48 group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[80px] -ml-48 -mb-48 group-hover:scale-110 transition-transform duration-700"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Your wisdom is <br /> our legacy.</h2>
                        <p className="text-lg opacity-80 mb-10 leading-relaxed font-medium">
                            Don't keep your stories to yourself. The world is waiting for your unique perspective. Join our archive today.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/register">
                                <Button variant="secondary" size="lg" className="px-12 rounded-2xl font-bold h-14 border-none bg-white text-primary hover:bg-white/90">
                                    Get Started
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="outline" size="lg" className="px-12 rounded-2xl font-bold h-14 text-white border-white hover:bg-white/10">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

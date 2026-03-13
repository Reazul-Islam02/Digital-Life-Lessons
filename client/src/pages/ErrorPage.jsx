import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center p-8 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full max-w-4xl h-full">
                <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
            </div>

            <div className="max-w-md space-y-12 animate-in zoom-in duration-700">
                <div className="relative flex justify-center items-center h-48">
                    <h1 className="text-[150px] font-black leading-none text-base-content/10 select-none tracking-tighter">
                        404
                    </h1>
                    <div className="absolute text-7xl drop-shadow-2xl">🧩</div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">Lost in Time</h2>
                    <p className="text-lg text-base-content/50 font-medium italic leading-relaxed">
                        This fragment of wisdom has either been archived or never existed in our collective consciousness.
                    </p>
                </div>

                <div className="pt-8">
                    <Link to="/">
                        <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black text-xl shadow-2xl shadow-primary/20">
                            Return to Reality
                        </Button>
                    </Link>
                </div>

                <p className="pt-10 text-[10px] uppercase font-black tracking-[0.4em] opacity-20">
                    Digital Life Lessons &copy; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;

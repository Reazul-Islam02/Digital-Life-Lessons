import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FaGoogle, FaUser, FaLink, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Register = () => {
    const { createUser, updateUserProfile, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            return toast.error("Password must be 6+ chars, with uppercase and lowercase.");
        }

        setLoading(true);
        try {
            await createUser(email, password);
            await updateUserProfile(name, photo);
            toast.success('Registration success!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            toast.success('Google Signup success!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center py-12 px-4">
            <div className="flex flex-col lg:flex-row-reverse w-full max-w-5xl bg-base-100 rounded-3xl shadow-premium overflow-hidden border border-base-200">
                {/* Right Side: Branding & Quote */}
                <div className="hidden lg:flex flex-1 bg-neutral relative items-center justify-center p-12 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-accent/30"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-[80px]"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/20 rounded-full blur-[80px]"></div>

                    <div className="relative z-10 text-center space-y-8 max-w-sm">
                        <div className="text-6xl text-secondary animate-bounce">✍️</div>
                        <h2 className="text-4xl font-black leading-tight tracking-tight">Start Your <br /><span className="text-secondary italic">Wisdom Log</span></h2>
                        <div className="space-y-4">
                            <p className="text-lg text-white/70 italic leading-relaxed">
                                "Learning is the only thing the mind never exhausts, never fears, and never regrets."
                            </p>
                            <p className="font-bold text-sm tracking-widest uppercase opacity-40">— Leonardo da Vinci</p>
                        </div>
                    </div>
                </div>

                {/* Left Side: Register Form */}
                <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full space-y-10">
                        <div className="text-center">
                            <h1 className="text-4xl font-black mb-3">Begin Your <span className="text-secondary">Legacy</span></h1>
                            <p className="text-base-content/50 font-medium tracking-tight">Create your mentor profile today</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Full Name"
                                    name="name"
                                    placeholder="John Doe"
                                    icon={FaUser}
                                    required
                                />
                                <Input
                                    label="Avatar URL"
                                    name="photo"
                                    placeholder="https://..."
                                    icon={FaLink}
                                />
                            </div>

                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                icon={FaEnvelope}
                                required
                            />

                            <Input
                                label="Master Password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                icon={FaLock}
                                required
                            />

                            <Button
                                type="submit"
                                variant="secondary"
                                loading={loading}
                                className="w-full h-14 rounded-xl text-lg font-black shadow-lg shadow-secondary/20 mt-4"
                            >
                                Begin Journey <FaArrowRight className="ml-2" />
                            </Button>
                        </form>

                        <div className="relative py-2 flex items-center gap-4">
                            <div className="grow h-px bg-base-200"></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/30 whitespace-nowrap">Alternative Access</span>
                            <div className="grow h-px bg-base-200"></div>
                        </div>

                        <Button
                            onClick={handleGoogleLogin}
                            variant="outline"
                            className="w-full h-14 rounded-xl border border-base-300 gap-3 font-bold hover:bg-base-200 transition-all group"
                        >
                            <FaGoogle className="group-hover:rotate-[360deg] transition-transform duration-700" />
                            Signup with Google
                        </Button>

                        <p className="text-center text-sm font-bold">
                            <span className="text-base-content/40">Already a member?</span>{' '}
                            <Link to="/login" className="text-secondary hover:underline underline-offset-4 decoration-2">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FaGoogle, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Login = () => {
    const { loginUser, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        setLoading(true);
        try {
            await loginUser(email, password);
            toast.success('Welcome back!');
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
            toast.success('Authenticated with Google!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center py-12 px-4">
            <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-base-100 rounded-3xl shadow-premium overflow-hidden border border-base-200">
                {/* Left Side: Branding & Quote */}
                <div className="hidden lg:flex flex-1 bg-neutral relative items-center justify-center p-12 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30"></div>
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-[80px]"></div>

                    <div className="relative z-10 text-center space-y-8 max-w-sm">
                        <div className="text-6xl text-primary animate-pulse">✨</div>
                        <h2 className="text-4xl font-black leading-tight tracking-tight">Preserving Human <br /><span className="text-primary italic">Intelligence</span></h2>
                        <div className="space-y-4">
                            <p className="text-lg text-white/70 italic leading-relaxed">
                                "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well."
                            </p>
                            <p className="font-bold text-sm tracking-widest uppercase opacity-40">— Ralph Waldo Emerson</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full space-y-10">
                        <div className="text-center">
                            <h1 className="text-4xl font-black mb-3">Welcome <span className="text-primary">Back</span></h1>
                            <p className="text-base-content/50 font-medium tracking-tight">Continue your journey of shared wisdom</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                icon={FaEnvelope}
                                required
                            />

                            <div className="space-y-1">
                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    icon={FaLock}
                                    required
                                />
                                <div className="text-right">
                                    <Link to="#" className="text-xs font-bold text-primary/60 hover:text-primary transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                loading={loading}
                                className="w-full h-14 rounded-xl text-lg font-black shadow-lg shadow-primary/20"
                            >
                                Sign In <FaArrowRight className="ml-2" />
                            </Button>
                        </form>

                        <div className="relative py-4 flex items-center gap-4">
                            <div className="grow h-px bg-base-200"></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/30 whitespace-nowrap">Social Access</span>
                            <div className="grow h-px bg-base-200"></div>
                        </div>

                        <Button
                            onClick={handleGoogleLogin}
                            variant="outline"
                            className="w-full h-14 rounded-xl border border-base-300 gap-3 font-bold hover:bg-base-200 transition-all group"
                        >
                            <FaGoogle className="group-hover:scale-110 transition-transform" />
                            Continue with Google
                        </Button>

                        <p className="text-center text-sm font-bold">
                            <span className="text-base-content/40">Need an account?</span>{' '}
                            <Link to="/register" className="text-primary hover:underline underline-offset-4 decoration-2">
                                Join the Collective
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTimesCircle, FaArrowLeft, FaUndo } from 'react-icons/fa';
import Button from '../../components/ui/Button';

const Cancel = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const redirectUrl = queryParams.get('redirect') || '/dashboard';

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-10 animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center text-error text-5xl shadow-xl shadow-error/10 border-4 border-error/20">
                <FaTimesCircle />
            </div>

            <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-error">Process Interrupted</h1>
                <p className="text-xl text-base-content/50 max-w-md mx-auto font-medium leading-relaxed">
                    The payment process was cancelled and no charges were made. If you encountered an issue, feel free to try again.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
                <Button
                    variant="primary"
                    size="lg"
                    className="w-full rounded-xl px-12 h-14 font-black text-lg shadow-xl shadow-primary/20"
                    onClick={() => navigate('/payment')}
                >
                    <FaUndo className="mr-2" /> Try Again
                </Button>
                <Link to={redirectUrl} className="w-full">
                    <Button
                        variant="ghost"
                        size="lg"
                        className="w-full rounded-xl px-12 h-14 border border-base-200 font-bold"
                    >
                        <FaArrowLeft className="mr-2" /> Go Back
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Cancel;

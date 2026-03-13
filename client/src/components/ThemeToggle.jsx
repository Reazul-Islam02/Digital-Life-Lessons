import { useTheme } from '../providers/ThemeProvider';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <label className="swap swap-rotate btn btn-ghost btn-circle bg-base-200/50 hover:bg-base-200 transition-all duration-300">
            {/* this hidden checkbox controls the state */}
            <input
                type="checkbox"
                onChange={toggleTheme}
                checked={theme === 'dark'}
            />

            {/* sun icon */}
            <FaSun className="swap-on text-xl text-amber-500 animate-in spin-in-180 duration-500" />

            {/* moon icon */}
            <FaMoon className="swap-off text-xl text-primary animate-in spin-in-180 duration-500" />
        </label>
    );
};

export default ThemeToggle;

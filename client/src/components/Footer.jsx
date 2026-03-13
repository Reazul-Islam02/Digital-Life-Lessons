import { FaTwitter, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-base-200 border-t border-base-300 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-6">
                        <Link to="/" className="flex items-center gap-1 text-3xl font-black">
                            <span className="text-primary italic">Daily Life</span>
                            <span className="text-base-content">Lesson</span>
                        </Link>
                        <p className="text-base-content/50 leading-relaxed max-w-xs font-medium">
                            Preserving the world's collective wisdom, one lesson at a time. Join our community of sharers and seekers.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: FaTwitter, link: 'https://twitter.com' },
                                { icon: FaFacebook, link: 'https://facebook.com' },
                                { icon: FaLinkedin, link: 'https://linkedin.com' },
                                { icon: FaGithub, link: 'https://github.com' }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-xl bg-base-300 flex items-center justify-center text-base-content/60 hover:text-primary hover:bg-primary/10 transition-all hover:scale-110"
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Group 1 */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-base-content/40 mb-8">Platform</h4>
                        <ul className="space-y-4">
                            <li><Link to="/lessons" className="text-base-content/70 hover:text-primary transition-all font-bold text-sm tracking-tight">Browse Lessons</Link></li>
                            <li><Link to="/dashboard/add-lesson" className="text-base-content/70 hover:text-primary transition-all font-bold text-sm tracking-tight">Share Wisdom</Link></li>
                            <li><Link to="/payment" className="text-base-content/70 hover:text-primary transition-all font-bold text-sm tracking-tight">Premium Access</Link></li>
                            <li><Link to="/dashboard/my-favorites" className="text-base-content/70 hover:text-primary transition-all font-bold text-sm tracking-tight">My Favorites</Link></li>
                        </ul>
                    </div>

                    {/* Links Group 2 */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-base-content/40 mb-8">Member Space</h4>
                        <ul className="space-y-4">
                            <li><Link to="/dashboard" className="text-base-content/70 hover:text-primary transition-all font-bold text-sm tracking-tight">Dashboard</Link></li>
                            <li><Link to="/dashboard/my-lessons" className="text-base-content/70 hover:text-primary transition-all font-bold text-sm tracking-tight">My Lessons</Link></li>
                            <li><Link to="/dashboard/profile" className="text-base-content/70 hover:text-primary transition-all font-bold text-sm tracking-tight">My Profile</Link></li>
                        </ul>
                    </div>

                    {/* Links Group 3 */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-base-content/40 mb-8">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link to="#" className="text-base-content/70 hover:text-primary transition-all font-bold text-sm tracking-tight">Privacy Policy</Link></li>
                            <li><Link to="#" className="text-base-content/70 hover:text-primary transition-all font-bold text-sm tracking-tight">Terms of Service</Link></li>
                            <li><Link to="#" className="text-base-content/70 hover:text-primary transition-all font-bold text-sm tracking-tight">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-base-300 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-black uppercase tracking-[0.2em] text-base-content/20">
                    <p>© {new Date().getFullYear()} Daily Life Lesson. All rights reserved.</p>
                    <p>Built with Passion for Humanity</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

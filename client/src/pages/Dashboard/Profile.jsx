import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaGithub, FaLinkedin, FaFacebook, FaGlobe, FaUser, FaEnvelope, FaPen, FaArrowRight, FaGem } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

const Profile = () => {
    const { user, userData, setUserData } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        photoURL: '',
        bio: '',
        socialLinks: {
            github: '',
            linkedin: '',
            facebook: '',
            website: ''
        }
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name || '',
                photoURL: userData.photo || userData.photoURL || '',
                bio: userData.bio || '',
                socialLinks: {
                    github: userData.socialLinks?.github || '',
                    linkedin: userData.socialLinks?.linkedin || '',
                    facebook: userData.socialLinks?.facebook || '',
                    website: userData.socialLinks?.website || ''
                }
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('social_')) {
            const platform = name.split('_')[1];
            setFormData(prev => ({
                ...prev,
                socialLinks: {
                    ...prev.socialLinks,
                    [platform]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!user) {
            toast.error('Please login to update profile');
            setLoading(false);
            return;
        }

        try {
            const token = await user.getIdToken();
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/users/profile/update`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Handle refactored API response
            const updatedUser = response.data.data?.user || response.data;
            setUserData(updatedUser);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Update profile error:', error);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-20">
            {/* Header / Hero Section */}
            <header className="relative bg-base-100 border border-base-200 p-8 md:p-12 rounded-3xl shadow-sm overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px] -mr-32 -mt-32"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border-4 border-base-200 shadow-xl group-hover:scale-105 transition-transform duration-500">
                            <img
                                src={formData.photoURL || `https://ui-avatars.com/api/?name=${formData.name}&background=random&size=200`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {userData?.isPremium && (
                            <div className="absolute -bottom-3 -right-3 bg-amber-500 text-white p-2 rounded-xl shadow-lg animate-bounce">
                                <FaGem size={20} />
                            </div>
                        )}
                    </div>

                    <div className="text-center md:text-left flex-1 space-y-4">
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                <h1 className="text-3xl md:text-4xl font-black tracking-tight">{formData.name}</h1>
                                {userData?.isPremium ? (
                                    <Badge variant="secondary" className="bg-amber-500 text-white border-none py-1.5 px-3 uppercase text-[10px] tracking-widest font-black">
                                        Premium Member ⭐
                                    </Badge>
                                ) : (
                                    <Link to="/payment?redirect=/dashboard/profile">
                                        <Badge variant="ghost" className="border-primary/20 text-primary hover:bg-primary/5 cursor-pointer">
                                            Upgrade Account
                                        </Badge>
                                    </Link>
                                )}
                            </div>
                            <p className="text-base-content/40 font-bold flex items-center justify-center md:justify-start gap-2 text-sm uppercase tracking-widest">
                                <FaEnvelope className="text-primary/40" /> {user?.email}
                            </p>
                        </div>

                        {formData.bio && (
                            <p className="text-lg text-base-content/60 italic font-medium max-w-2xl leading-relaxed">
                                &ldquo;{formData.bio}&rdquo;
                            </p>
                        )}

                        <div className="flex gap-4 pt-4 justify-center md:justify-start">
                            {[
                                { icon: FaGithub, link: formData.socialLinks.github, color: 'hover:text-black dark:hover:text-white' },
                                { icon: FaLinkedin, link: formData.socialLinks.linkedin, color: 'hover:text-[#0077b5]' },
                                { icon: FaFacebook, link: formData.socialLinks.facebook, color: 'hover:text-[#1877f2]' },
                                { icon: FaGlobe, link: formData.socialLinks.website, color: 'hover:text-primary' }
                            ].map((social, idx) => (
                                social.link && (
                                    <a
                                        key={idx}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 rounded-xl bg-base-200/50 flex items-center justify-center transition-all ${social.color} hover:scale-110 active:scale-95`}
                                    >
                                        <social.icon size={20} />
                                    </a>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Edit Form */}
            <section className="bg-base-100 border border-base-200 rounded-3xl shadow-premium overflow-hidden">
                <div className="p-8 md:p-12 space-y-10">
                    <div className="flex items-center gap-3 border-b border-base-200 pb-4">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <FaPen size={14} />
                        </div>
                        <h2 className="font-black text-xl tracking-tight uppercase">Update Profile Information</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {/* Basic Info */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-base-content/30 mb-2">Core Identity</h3>
                                <Input
                                    label="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    icon={FaUser}
                                    required
                                />
                                <Input
                                    label="Profile Photo URL"
                                    name="photoURL"
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                    icon={FaGlobe}
                                    type="url"
                                />
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-base-content/60 uppercase tracking-widest ml-1">About Bio</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        className="textarea textarea-bordered w-full rounded-xl border-2 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium h-32 py-4 px-5 leading-relaxed"
                                        placeholder="Tell the archive a bit about your journey..."
                                    ></textarea>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-base-content/30 mb-2">Digital Presence</h3>
                                <Input
                                    label="GitHub Profile"
                                    name="social_github"
                                    value={formData.socialLinks.github}
                                    onChange={handleChange}
                                    icon={FaGithub}
                                    placeholder="https://github.com/..."
                                />
                                <Input
                                    label="LinkedIn Profile"
                                    name="social_linkedin"
                                    value={formData.socialLinks.linkedin}
                                    onChange={handleChange}
                                    icon={FaLinkedin}
                                    placeholder="https://linkedin.com/in/..."
                                />
                                <Input
                                    label="Facebook Profile"
                                    name="social_facebook"
                                    value={formData.socialLinks.facebook}
                                    onChange={handleChange}
                                    icon={FaFacebook}
                                    placeholder="https://facebook.com/..."
                                />
                                <Input
                                    label="Personal Website"
                                    name="social_website"
                                    value={formData.socialLinks.website}
                                    onChange={handleChange}
                                    icon={FaGlobe}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-6 border-t border-base-200">
                            <Button
                                type="submit"
                                variant="primary"
                                loading={loading}
                                className="px-12 h-14 rounded-xl font-black text-lg shadow-xl shadow-primary/20"
                            >
                                Save Changes <FaArrowRight className="ml-2" />
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Profile;

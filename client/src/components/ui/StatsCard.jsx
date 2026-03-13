import React from 'react';

const StatsCard = ({ label, value, icon: Icon, colorClass = 'bg-primary/10 text-primary' }) => {
    return (
        <div className="bg-base-100 border border-base-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-6 group">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${colorClass}`}>
                {Icon}
            </div>
            <div>
                <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-3xl font-black text-base-content">{value}</p>
            </div>
        </div>
    );
};

export default StatsCard;

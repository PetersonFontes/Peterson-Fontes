
import React from 'react';

const Loader: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => {
    const sizeClasses = size === 'sm' 
        ? 'w-5 h-5 border-2' 
        : 'w-6 h-6 border-4';
    return (
        <div className={`loader ${sizeClasses}`} />
    );
};

export default Loader;

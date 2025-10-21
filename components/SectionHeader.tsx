import React from 'react';

interface SectionHeaderProps {
    title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
    return (
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
            {title}
        </h2>
    );
};

export default SectionHeader;
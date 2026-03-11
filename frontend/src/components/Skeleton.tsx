import React from 'react';

interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    circle?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', width, height, circle }) => {
    return (
        <div
            className={`animate-pulse bg-gray-200 rounded-md ${className}`}
            style={{
                width: width,
                height: height,
                borderRadius: circle ? '50%' : undefined
            }}
        />
    );
};

export default Skeleton;

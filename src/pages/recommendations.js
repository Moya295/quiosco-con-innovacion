import React from 'react';
import { useUser } from '../context/UserContext';

const Recommendations = () => {
    const { recommendations } = useUser();

    return (
        <div>
            <h1>Recomendaciones para ti</h1>
            <ul>
                {recommendations.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendations;

import React from 'react';

export const Header: React.FC = () => {
    return (
        <header style={{ textAlign: 'center' }}>
            <h1>Personal Loan Payment Calculator (2026)</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
                Estimate your monthly personal loan payment and total cost
            </p>
        </header>
    );
};

import React from 'react';

export const Header: React.FC = () => {
    return (
        <header style={{ textAlign: 'center' }}>
            <h1>Debt-to-Income (DTI) Calculator (2026)</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
                Estimate your debt-to-income ratio used by lenders for loan qualification
            </p>
        </header>
    );
};

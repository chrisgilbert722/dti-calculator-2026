import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div className="card" style={{ background: '#F8FAFC' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                This personal loan calculator provides estimated monthly payments, total interest,
                and total cost based on your loan amount, interest rate, and term length. Origination
                fees are factored into the total cost calculation. These figures are estimates only
                and actual loan terms may vary based on your credit profile, lender policies, and
                market conditions. This calculator is for informational purposes and does not
                constitute a loan offer or financial advice.
            </p>
        </div>
    );
};

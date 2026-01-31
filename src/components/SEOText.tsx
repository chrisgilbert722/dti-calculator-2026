import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div className="card" style={{ background: '#F8FAFC' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                This debt-to-income (DTI) calculator provides estimated DTI ratios based on
                your monthly income and debt payments. Lenders typically use both front-end DTI
                (housing costs divided by income) and back-end DTI (total debt divided by income)
                when evaluating loan applications. These figures are estimates only and actual
                lending requirements vary by lender, loan type, and other factors. This calculator
                is for informational purposes and does not constitute lending or financial advice.
            </p>
        </div>
    );
};

import React from 'react';
import type { DTIResult } from '../logic/dtiCalculations';

interface ResultsPanelProps {
    result: DTIResult;
}

const getRatingColor = (rating: DTIResult['dtiRating']): { bg: string; border: string; text: string } => {
    switch (rating) {
        case 'excellent':
            return { bg: 'linear-gradient(to bottom, #F0FDF4, #DCFCE7)', border: '#86EFAC', text: '#166534' };
        case 'good':
            return { bg: 'linear-gradient(to bottom, #F0F9FF, #E0F2FE)', border: '#7DD3FC', text: '#0369A1' };
        case 'fair':
            return { bg: 'linear-gradient(to bottom, #FFFBEB, #FEF3C7)', border: '#FCD34D', text: '#92400E' };
        case 'high':
            return { bg: 'linear-gradient(to bottom, #FFF7ED, #FFEDD5)', border: '#FDBA74', text: '#C2410C' };
        case 'very_high':
            return { bg: 'linear-gradient(to bottom, #FEF2F2, #FEE2E2)', border: '#FCA5A5', text: '#B91C1C' };
    }
};

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(val);
};

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
    const colors = getRatingColor(result.dtiRating);

    return (
        <div className="card" style={{ background: colors.bg, borderColor: colors.border, boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.1)' }}>
            <div className="text-center">
                <h2 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                    Estimated Back-End DTI Ratio
                </h2>
                <div style={{ fontSize: '2.75rem', fontWeight: 800, color: colors.text, lineHeight: 1, letterSpacing: '-0.025em' }}>
                    {result.backEndDTI.toFixed(1)}%
                </div>
                <div style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: colors.text,
                    marginTop: 'var(--space-2)',
                    padding: 'var(--space-1) var(--space-3)',
                    background: 'rgba(255,255,255,0.5)',
                    borderRadius: 'var(--radius-md)',
                    display: 'inline-block'
                }}>
                    {result.dtiRatingLabel}
                </div>
            </div>

            <hr style={{ margin: 'var(--space-6) 0', border: 'none', borderTop: `1px solid ${colors.border}` }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)', textAlign: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>MONTHLY INCOME</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>{formatCurrency(result.monthlyIncome)}</div>
                </div>
                <div style={{ borderLeft: `1px solid ${colors.border}`, borderRight: `1px solid ${colors.border}` }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>TOTAL DEBT</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>{formatCurrency(result.totalMonthlyDebt)}</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>FRONT-END DTI</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                        {result.frontEndDTI.toFixed(1)}%
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'rgba(255,255,255,0.6)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    {result.dtiRatingDescription}
                </span>
            </div>
        </div>
    );
};

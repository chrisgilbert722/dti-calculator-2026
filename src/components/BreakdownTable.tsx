import React from 'react';
import type { DTIResult } from '../logic/dtiCalculations';

interface BreakdownTableProps {
    result: DTIResult;
}

const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(val);
};

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ result }) => {
    const incomeDebtRows = [
        { label: 'Estimated Monthly Gross Income', value: formatMoney(result.monthlyIncome), isTotal: false },
        { label: 'Estimated Housing Payment', value: formatMoney(result.housingPayment), isTotal: false },
        { label: 'Estimated Other Debt Payments', value: formatMoney(result.nonHousingDebt), isTotal: false },
        { label: 'Estimated Total Monthly Debt', value: formatMoney(result.totalMonthlyDebt), isTotal: true },
    ];

    const dtiRows = [
        { label: 'Estimated Front-End DTI (Housing Only)', value: `${result.frontEndDTI.toFixed(1)}%`, isTotal: false },
        { label: 'Estimated Back-End DTI (Total Debt)', value: `${result.backEndDTI.toFixed(1)}%`, isTotal: true },
    ];

    const thresholdRows = [
        { label: 'Excellent DTI', value: '≤ 20%', isTotal: false },
        { label: 'Good DTI', value: '20% - 36%', isTotal: false },
        { label: 'Fair DTI', value: '36% - 43%', isTotal: false },
        { label: 'High DTI', value: '43% - 50%', isTotal: false },
        { label: 'Very High DTI', value: '> 50%', isTotal: false },
    ];

    const renderTable = (rows: Array<{ label: string; value: string; isTotal: boolean }>, isLast = false) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
            <tbody>
                {rows.map((row, idx) => (
                    <tr key={idx} style={{
                        borderBottom: (isLast && idx === rows.length - 1) ? 'none' : '1px solid var(--color-border)',
                        backgroundColor: idx % 2 === 0 ? 'transparent' : '#F8FAFC'
                    }}>
                        <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>
                            {row.label}
                        </td>
                        <td style={{
                            padding: 'var(--space-3) var(--space-6)',
                            textAlign: 'right',
                            fontWeight: row.isTotal ? 700 : 400,
                            color: row.isTotal ? 'var(--color-primary)' : 'inherit'
                        }}>
                            {row.value}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="card" style={{ padding: '0' }}>
            {/* Income & Debt Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1rem' }}>Estimated Monthly Income & Debt</h3>
            </div>
            {renderTable(incomeDebtRows)}

            {/* DTI Ratios Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F0F9FF' }}>
                <h3 style={{ fontSize: '1rem', color: '#0369A1' }}>Estimated DTI Ratios</h3>
            </div>
            {renderTable(dtiRows)}

            {/* Thresholds Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F8FAFC' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>Common DTI Thresholds</h3>
            </div>
            {renderTable(thresholdRows, true)}
        </div>
    );
};

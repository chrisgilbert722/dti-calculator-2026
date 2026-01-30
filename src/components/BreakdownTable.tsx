import React from 'react';
import type { LoanResult } from '../logic/loanCalculations';

interface BreakdownTableProps {
    result: LoanResult;
    loanTermMonths: number;
}

const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(val);
};

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ result, loanTermMonths }) => {
    const paymentRows = [
        { label: 'Estimated Monthly Payment', value: formatMoney(result.monthlyPayment), isTotal: false },
        { label: 'Number of Payments', value: `${loanTermMonths} months`, isTotal: false },
    ];

    const costRows = [
        { label: 'Estimated Principal Amount', value: formatMoney(result.principalAmount), isTotal: false },
        { label: 'Estimated Total Interest', value: formatMoney(result.totalInterest), isTotal: false },
        { label: 'Estimated Origination Fees', value: formatMoney(result.originationFeeAmount), isTotal: false },
        { label: 'Estimated Total Repayment Amount', value: formatMoney(result.totalRepaymentAmount), isTotal: true },
    ];

    return (
        <div className="card" style={{ padding: '0' }}>
            {/* Payment Details Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1rem' }}>Estimated Payment Details</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
                <tbody>
                    {paymentRows.map((row, idx) => (
                        <tr key={idx} style={{
                            borderBottom: '1px solid var(--color-border)',
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

            {/* Total Cost Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F8FAFC' }}>
                <h3 style={{ fontSize: '1rem' }}>Estimated Total Loan Costs</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
                <tbody>
                    {costRows.map((row, idx) => (
                        <tr key={idx} style={{
                            borderBottom: idx === costRows.length - 1 ? 'none' : '1px solid var(--color-border)',
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
        </div>
    );
};

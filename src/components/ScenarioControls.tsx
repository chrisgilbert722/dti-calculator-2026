import React from 'react';
import type { DTIInput } from '../logic/dtiCalculations';

interface ScenarioControlsProps {
    values: DTIInput;
    onChange: (field: keyof DTIInput, value: number | boolean) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const incomeOptions = [
        { label: '$4,000', value: 4000 },
        { label: '$6,000', value: 6000 },
        { label: '$8,000', value: 8000 },
        { label: '$10,000', value: 10000 },
    ];

    const debtOptions = [
        { label: '$500', value: 500 },
        { label: '$1,000', value: 1000 },
        { label: '$1,500', value: 1500 },
        { label: '$2,000', value: 2000 },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Adjustments</h3>

            {/* Income Quick Select */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ marginBottom: 'var(--space-2)' }}>Monthly Income</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {incomeOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('monthlyGrossIncome', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.monthlyGrossIncome === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.monthlyGrossIncome === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.monthlyGrossIncome === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Debt Quick Select */}
            <div>
                <label style={{ marginBottom: 'var(--space-2)' }}>
                    {values.includeHousingSeparately ? 'Other Monthly Debt' : 'Total Monthly Debt'}
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {debtOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('monthlyDebtPayments', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.monthlyDebtPayments === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.monthlyDebtPayments === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.monthlyDebtPayments === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

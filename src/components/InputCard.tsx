import React from 'react';
import type { DTIInput } from '../logic/dtiCalculations';

interface InputCardProps {
    values: DTIInput;
    onChange: (field: keyof DTIInput, value: number | boolean) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* Monthly Gross Income */}
                <div>
                    <label htmlFor="monthlyGrossIncome">Monthly Gross Income ($)</label>
                    <input
                        type="number"
                        id="monthlyGrossIncome"
                        value={values.monthlyGrossIncome}
                        onChange={(e) => onChange('monthlyGrossIncome', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="100"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Your total monthly income before taxes and deductions
                    </span>
                </div>

                {/* Include Housing Separately Toggle */}
                <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={values.includeHousingSeparately}
                            onChange={(e) => onChange('includeHousingSeparately', e.target.checked)}
                        />
                        <span>Track housing payment separately (for front-end DTI)</span>
                    </label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)', display: 'block' }}>
                        Enable to calculate both front-end and back-end DTI ratios
                    </span>
                </div>

                {/* Housing Payment (conditional) */}
                {values.includeHousingSeparately && (
                    <div>
                        <label htmlFor="housingPayment">Monthly Housing Payment ($)</label>
                        <input
                            type="number"
                            id="housingPayment"
                            value={values.housingPayment}
                            onChange={(e) => onChange('housingPayment', parseFloat(e.target.value) || 0)}
                            min="0"
                            step="100"
                        />
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                            Rent or mortgage payment (including taxes, insurance, HOA if applicable)
                        </span>
                    </div>
                )}

                {/* Monthly Debt Payments */}
                <div>
                    <label htmlFor="monthlyDebtPayments">
                        {values.includeHousingSeparately ? 'Other Monthly Debt Payments ($)' : 'Total Monthly Debt Payments ($)'}
                    </label>
                    <input
                        type="number"
                        id="monthlyDebtPayments"
                        value={values.monthlyDebtPayments}
                        onChange={(e) => onChange('monthlyDebtPayments', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="50"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {values.includeHousingSeparately
                            ? 'Car loans, student loans, credit cards, personal loans, etc. (excluding housing)'
                            : 'All debt payments including housing, car loans, student loans, credit cards, etc.'}
                    </span>
                </div>
            </div>
        </div>
    );
};

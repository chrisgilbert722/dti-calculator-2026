export interface DTIInput {
    monthlyGrossIncome: number;
    monthlyDebtPayments: number;
    housingPayment: number;
    includeHousingSeparately: boolean;
}

export interface DTIResult {
    frontEndDTI: number; // Housing only / Income
    backEndDTI: number; // Total debt / Income
    totalMonthlyDebt: number;
    monthlyIncome: number;
    housingPayment: number;
    nonHousingDebt: number;
    dtiRating: 'excellent' | 'good' | 'fair' | 'high' | 'very_high';
    dtiRatingLabel: string;
    dtiRatingDescription: string;
}

export function calculateDTI(input: DTIInput): DTIResult {
    const monthlyIncome = Math.max(0, input.monthlyGrossIncome);
    const monthlyDebtPayments = Math.max(0, input.monthlyDebtPayments);
    const housingPayment = input.includeHousingSeparately ? Math.max(0, input.housingPayment) : 0;

    // Total monthly debt includes housing if tracked separately, otherwise just debt payments
    const totalMonthlyDebt = input.includeHousingSeparately
        ? housingPayment + monthlyDebtPayments
        : monthlyDebtPayments;

    const nonHousingDebt = monthlyDebtPayments;

    // Calculate DTI ratios
    const frontEndDTI = monthlyIncome > 0 ? (housingPayment / monthlyIncome) * 100 : 0;
    const backEndDTI = monthlyIncome > 0 ? (totalMonthlyDebt / monthlyIncome) * 100 : 0;

    // Determine DTI rating based on back-end DTI
    let dtiRating: DTIResult['dtiRating'];
    let dtiRatingLabel: string;
    let dtiRatingDescription: string;

    if (backEndDTI <= 20) {
        dtiRating = 'excellent';
        dtiRatingLabel = 'Excellent';
        dtiRatingDescription = 'DTI under 20% is considered excellent by most lenders';
    } else if (backEndDTI <= 36) {
        dtiRating = 'good';
        dtiRatingLabel = 'Good';
        dtiRatingDescription = 'DTI between 20-36% is generally considered healthy';
    } else if (backEndDTI <= 43) {
        dtiRating = 'fair';
        dtiRatingLabel = 'Fair';
        dtiRatingDescription = 'DTI between 36-43% may limit some lending options';
    } else if (backEndDTI <= 50) {
        dtiRating = 'high';
        dtiRatingLabel = 'High';
        dtiRatingDescription = 'DTI between 43-50% may make qualifying for loans more difficult';
    } else {
        dtiRating = 'very_high';
        dtiRatingLabel = 'Very High';
        dtiRatingDescription = 'DTI over 50% typically exceeds most lender requirements';
    }

    return {
        frontEndDTI,
        backEndDTI,
        totalMonthlyDebt,
        monthlyIncome,
        housingPayment,
        nonHousingDebt,
        dtiRating,
        dtiRatingLabel,
        dtiRatingDescription
    };
}

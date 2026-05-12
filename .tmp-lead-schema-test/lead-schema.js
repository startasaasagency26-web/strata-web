const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const trimString = (value) => {
    if (typeof value !== "string")
        return "";
    return value.trim();
};
const optionalString = (value) => {
    const trimmed = trimString(value);
    return trimmed || undefined;
};
const optionalBoolean = (value) => {
    if (typeof value === "boolean")
        return value;
    return undefined;
};
const createLeadId = () => {
    const randomId = globalThis.crypto?.randomUUID?.();
    if (randomId)
        return randomId;
    return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
};
export const normalizePhone = (value) => {
    const raw = trimString(value);
    if (!raw)
        return "";
    const hasPlus = raw.startsWith("+");
    const digits = raw.replace(/\D/g, "");
    if (!digits)
        return "";
    if (hasPlus)
        return `+${digits}`;
    if (digits.startsWith("60"))
        return `+${digits}`;
    if (digits.startsWith("0"))
        return `+60${digits.slice(1)}`;
    if (digits.length >= 8 && digits.length <= 11)
        return `+60${digits}`;
    return `+${digits}`;
};
const isValidPhone = (value) => {
    const digits = value.replace(/\D/g, "");
    return value.startsWith("+") && digits.length >= 8 && digits.length <= 16;
};
export const validateLeadPayload = (payload, context = {}) => {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
        return {
            ok: false,
            fieldErrors: {
                payload: "Enter valid lead details.",
            },
        };
    }
    const rawPayload = payload;
    const fieldErrors = {};
    const fullName = trimString(rawPayload.fullName);
    const companyName = trimString(rawPayload.companyName);
    const workEmail = trimString(rawPayload.workEmail).toLowerCase();
    const whatsappPhone = normalizePhone(rawPayload.whatsappPhone);
    const roleInBusiness = trimString(rawPayload.roleInBusiness);
    const countryTimezone = trimString(rawPayload.countryTimezone);
    const preferredLanguage = trimString(rawPayload.preferredLanguage);
    if (!fullName)
        fieldErrors.fullName = "Full name is required.";
    if (!companyName)
        fieldErrors.companyName = "Company name is required.";
    if (!workEmail) {
        fieldErrors.workEmail = "Work email is required.";
    }
    else if (!emailPattern.test(workEmail)) {
        fieldErrors.workEmail = "Enter a valid email address.";
    }
    if (!whatsappPhone) {
        fieldErrors.whatsappPhone = "WhatsApp / phone is required.";
    }
    else if (!isValidPhone(whatsappPhone)) {
        fieldErrors.whatsappPhone = "Enter a valid WhatsApp or phone number.";
    }
    if (!roleInBusiness)
        fieldErrors.roleInBusiness = "Role in business is required.";
    if (!countryTimezone)
        fieldErrors.countryTimezone = "Country / timezone is required.";
    if (!preferredLanguage)
        fieldErrors.preferredLanguage = "Preferred language is required.";
    if (Object.keys(fieldErrors).length > 0) {
        return {
            ok: false,
            fieldErrors,
        };
    }
    const now = context.now ?? (() => new Date());
    const lead = {
        id: createLeadId(),
        createdAt: now().toISOString(),
        fullName,
        companyName,
        workEmail,
        whatsappPhone,
        roleInBusiness,
        countryTimezone,
        preferredLanguage,
        rawPayload,
    };
    const optionalFields = {
        businessType: optionalString(rawPayload.businessType),
        serviceNeed: optionalString(rawPayload.serviceNeed),
        websiteUrl: optionalString(rawPayload.websiteUrl),
        currentProblem: optionalString(rawPayload.currentProblem),
        projectGoal: optionalString(rawPayload.projectGoal),
        budgetRange: optionalString(rawPayload.budgetRange),
        selectedPackage: optionalString(rawPayload.selectedPackage),
        timeline: optionalString(rawPayload.timeline),
        sourcePage: optionalString(rawPayload.sourcePage) ?? context.sourcePage,
        consent: optionalBoolean(rawPayload.consent),
        marketingOptIn: optionalBoolean(rawPayload.marketingOptIn),
    };
    for (const [key, value] of Object.entries(optionalFields)) {
        if (value !== undefined) {
            Object.assign(lead, { [key]: value });
        }
    }
    return {
        ok: true,
        lead,
    };
};

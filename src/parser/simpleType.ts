import { Enumeration, SimpleType } from '../xsd/interfaces';

export const buildPattern = (simpleType?: SimpleType): string | undefined => {
    return simpleType?.restriction?.pattern
        ? simpleType?.restriction?.pattern['@value']
        : undefined;
};

export const buildEnum = (
    ennumeration?: Enumeration | Enumeration[],
): string[] | undefined => {
    if (!ennumeration) return undefined;

    const normalizedEnumeration: Enumeration[] = [];

    return normalizedEnumeration
        .concat(ennumeration)
        .map(element => element['@value']!);
};

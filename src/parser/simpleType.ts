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

    const normalizedEnumeration = ([] as Enumeration[]).concat(ennumeration);

    return normalizedEnumeration.map(element => element['@value']!);
};

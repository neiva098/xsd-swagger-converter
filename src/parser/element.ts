import {
    Choice,
    ComplexType,
    DoccumentationType,
    Element,
    Sequence,
} from '../xsd/interfaces';
import { SwaggerElement, SwagguerChoice } from './interfaces';
import { buildEnum, buildPattern } from './simpleType';

export const removeSpecialCharecter = (text: string | null): string => {
    return text === null ? '' : text.replace(/[\n\r\t]/g, ' ');
};

export const buildDescription = (
    doccumentation?: DoccumentationType,
): string | undefined => {
    if (!doccumentation) return undefined;

    const doccumentationArray =
        typeof doccumentation === 'string'
            ? [doccumentation]
            : Object.values(doccumentation);

    return doccumentationArray.map(removeSpecialCharecter).join(', ');
};

export const buildType = (element: Element): 'object' | 'array' | 'string' => {
    const isArray = element['@maxOccurs'] !== undefined;

    const isObject = element.complexType !== undefined;

    if (isArray) return 'array';

    if (isObject) return 'object';

    return 'string';
};

export const buildRequired = (element: Element): boolean =>
    element['@minOccurs'] !== '0';

export const getComplexTypePropertie = (
    type: 'object' | 'array' | 'string',
    complexType?: ComplexType,
): { allOf: unknown } | { items: { allOf: unknown } } | undefined => {
    const propertie = { allOf: buildComplexType(complexType) };

    if (type === 'array')
        return {
            items: {
                ...propertie,
            },
        };

    return propertie;
};

export const buildChoice = (choice?: Choice): SwagguerChoice | undefined => {
    if (!choice?.element) return undefined;

    return {
        oneOf: choice?.element?.map(element => {
            return buildElement(element);
        }),
    };
};

export const concatAllElementsOnSequence = (
    sequence?: Sequence,
    actual: Element[] = [],
): Element[] => {
    while (sequence !== undefined)
        return concatAllElementsOnSequence(
            sequence.sequence,
            actual.concat(sequence.element as Element[]),
        );

    return actual;
};

export const buildComplexType = (
    complexType?: ComplexType,
): SwaggerElement[] | undefined => {
    if (!complexType) return undefined;

    const elements: Element[] = concatAllElementsOnSequence(complexType.sequence);

    const elementos = elements
        ?.filter(element => element !== undefined)
        .map(element => buildElement(element));

    const choices =
        buildChoice(complexType.choice || complexType.sequence?.choice) || [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return elementos.concat(choices as any);
};

export const buildElement = (element: Element): SwaggerElement => {
    const type = buildType(element);
    const enummeration = buildEnum(element.simpleType?.restriction?.enumeration);

    const complexType =
        type !== 'string' ? getComplexTypePropertie(type, element.complexType) : {};

    return {
        [element['@name']]: {
            required: element['@minOccurs'] !== '0',
            description: buildDescription(element.annotation?.documentation),
            type,
            enum: enummeration,
            pattern: buildPattern(element.simpleType),
            ...complexType,
            example: enummeration !== undefined ? enummeration[0] : undefined,
        },
    };
};

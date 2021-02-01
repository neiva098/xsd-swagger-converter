import {
    Choice,
    ComplexType,
    DoccumentationType,
    Element,
    Sequence,
    SimpleType,
} from '../xsd/interfaces';
import {
    SimpleTypePropertiesInterface,
    SwaggerElement,
    SwagguerChoice,
} from './interfaces';
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

export const buildComplexTypePropertie = (
    type: string,
    complexType: ComplexType,
): { allOf: unknown } | { items: { allOf: unknown } } | undefined => {
    const propertie = { allOf: buildComplexType(complexType)! };

    if (type === 'array')
        return {
            items: {
                ...propertie,
            },
        };

    return propertie;
};

export const buildSimplePropertie = (
    type: string,
    simpleType: SimpleType,
): SimpleTypePropertiesInterface | { items: SimpleTypePropertiesInterface } => {
    const enummeration = buildEnum(simpleType?.restriction?.enumeration);

    const properties = {
        enum: enummeration,
        pattern: buildPattern(simpleType),
        example: enummeration !== undefined ? enummeration[0] : undefined,
        type: 'string',
    };

    if (type === 'array')
        return {
            items: properties,
        };

    return properties;
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
            actual.concat((sequence.element || []) as Element[]),
        );

    return actual;
};

export const concatAllChoicesOnSequence = (
    sequence?: Sequence,
    actual: Choice[] = [],
): Choice[] => {
    while (sequence !== undefined)
        return concatAllChoicesOnSequence(
            sequence.sequence,
            actual.concat((sequence.choice || []) as Choice[]),
        );

    return actual;
};

export const buildComplexType = (complexType?: ComplexType): SwaggerElement[] => {
    const elements: Element[] = concatAllElementsOnSequence(complexType?.sequence);
    const choices: Choice[] = concatAllChoicesOnSequence(
        complexType?.sequence,
        complexType?.choice ? [complexType.choice] : [],
    );

    const properties = elements.map(element => buildElement(element));

    const oneOfInstances = choices.map(choice => buildChoice(choice));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return properties.concat(oneOfInstances as any);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildElement = (element: Element): any => {
    const type = buildType(element);

    const propeFromType = element.complexType
        ? buildComplexTypePropertie(type, element.complexType)
        : buildSimplePropertie(type, element.simpleType!);

    return {
        [element['@name'] || element['@ref']!]: {
            required: element['@minOccurs'] !== '0',
            description: buildDescription(element.annotation?.documentation),
            type,
            ...propeFromType,
        },
    };
};

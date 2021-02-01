import { ComplexType, Element, RootObject } from '../xsd/interfaces';
import { buildComplexType } from './element';
import { BuildedSwagguerInterface } from './interfaces';

export const handleRootIsElement = (
    element: Element,
): BuildedSwagguerInterface[] => {
    return [
        {
            [element['@name']!]: {
                properties: buildComplexType(element.complexType),
            },
        },
    ];
};

export const handleRootIsComplexType = (
    complexType: ComplexType[],
): BuildedSwagguerInterface[] => {
    return complexType.map(ct => {
        return {
            [ct['@name']!]: {
                properties: buildComplexType(ct),
            },
        };
    });
};

export const xsdJsonToDoc = (root: RootObject): BuildedSwagguerInterface[] => {
    if (root.element) return handleRootIsElement(root.element);

    return handleRootIsComplexType(root.complexType!);
};

export interface Import {
    '@namespace'?: string;
    '@schemaLocation'?: string;
}

export interface Include {
    '@schemaLocation'?: string;
}

export interface Annotation {
    documentation?: DoccumentationType;
}

export type DoccumentationType = string | string[] | Record<string, string> | null;

export interface Choice {
    element?: Element[];
}

export interface MaxLength {
    '@value'?: string;
}

export interface MinLength {
    '@value'?: string;
}

export interface WhiteSpace {
    '@value'?: string;
}

export interface Pattern {
    '@value'?: string;
}

export interface Restriction {
    '@base'?: string;
    maxLength?: MaxLength;
    minLength?: MinLength;
    whiteSpace?: WhiteSpace;
    pattern?: Pattern;
    enumeration?: Enumeration | Enumeration[];
}

export interface SimpleType {
    restriction?: Restriction;
}

export interface Element {
    '@name': string;
    annotation?: Annotation;
    complexType?: ComplexType;
    '@minOccurs'?: string;
    '@ref'?: string;
    '@type'?: string;
    '@maxOccurs'?: string;
    simpleType?: SimpleType;
}

export interface Length {
    '@value'?: string;
}

export interface Sequence {
    element?: Element[];
    choice?: Choice;
    sequence?: Sequence;
}

export interface Attribute {
    '@name'?: string;
    '@use'?: string;
    simpleType?: SimpleType;
    '@type'?: string;
    annotation?: Annotation;
}

export interface ComplexType {
    '@name'?: string;
    annotation?: Annotation;
    sequence?: Sequence;
    attribute?: Attribute;
    choice?: Choice;
}

export interface Enumeration {
    '@value'?: string;
}
export interface RootObject {
    '@targetNamespace'?: string;
    '@elementFormDefault'?: string;
    '@attributeFormDefault'?: string;
    import?: Import;
    include?: Include;
    complexType?: ComplexType[];
    simpleType?: SimpleType[];
}

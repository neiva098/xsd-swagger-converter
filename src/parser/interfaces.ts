export interface SwaggerElement {
    [x: string]: {
        required: boolean;
        description: string | undefined;
        type: 'string' | 'object' | 'array';
        enum: string[] | undefined;
        pattern: string | undefined;
        example: string | undefined;
        items: SimpleTypePropertiesInterface | { allOf: SwaggerElement[] };
    };
}

export interface SwagguerChoice {
    oneOf: SwaggerElement[];
}

export interface BuildedSwagguerInterface {
    [x: string]: {
        properties: SwaggerElement[] | undefined;
    };
}

export interface SimpleTypePropertiesInterface {
    enum: string[] | undefined;
    pattern: string | undefined;
    example: string | undefined;
    type: string;
}

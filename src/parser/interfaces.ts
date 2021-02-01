export interface SwaggerElement {
    [x: string]: {
        required: boolean;
        description: string | undefined;
        type: 'string' | 'object' | 'array';
        enum: string[] | undefined;
        pattern: string | undefined;
        example: string | undefined;
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

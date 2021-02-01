import fs from 'fs';
import path from 'path';
import { xsdJsonToDoc } from './parser';
import rootXsd from '../definitions/jsonXsd.json';

function main() {
    const swagguerDefinitions = xsdJsonToDoc(rootXsd);

    fs.writeFileSync(
        path.resolve('./definitions/swagguer.json'),
        JSON.stringify(swagguerDefinitions),
    );
}

main();

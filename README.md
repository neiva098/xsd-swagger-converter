xsd-swagger-converter

# install:

* run the following command **npm ci**
# instructions:

* parse your xsd file to json in https://www.freeformatter.com/xml-to-json-converter.html#ad-output

* paste your parsed xsd in "definitions" and name the file to "jsonXsd.json"

* run with **npm run dev** or **npm run build && npm start**

* the path to the converted xsd to swagguer is **definitions\swagguer.json**

# bugs

* some elements is imported from another xsd

# future features

* all xsd file in a folder, automatic parse xsd to json.



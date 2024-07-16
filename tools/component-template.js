'use strict'

const dashify = require('dashify')

module.exports = ({ componentName }) => {
  return `import * as React from "react";
import { ${componentName} as Shadcn${componentName},  } from "../ui/${componentName.toLowerCase()}";
import "../index.css";

export interface ${componentName}Props{
  
}

const ${componentName}: React.FC<${componentName}Props> = (props) => {
  return <Shadcn${componentName} {...props} />;
};

export default ${componentName};
`
}

/* Block dangerous patterns */

const blockedPatterns = [

    "document.cookie",
  
    "localStorage",
  
    "sessionStorage",
  
    "fetch(",
  
    "XMLHttpRequest",
  
    "eval(",
  
    "Function("
  
  ];
  
  /* Validate generated files */
  
  const validateSecurity =
  (files) => {
  
    for (const file of files) {
  
      const content =
        file.content;
  
      for (const pattern of blockedPatterns) {
  
        if (
          content.includes(pattern)
        ) {
  
          throw new Error(
            `Blocked unsafe code: ${pattern}`
          );
  
        }
  
      }
  
    }
  
  };
  
  module.exports =
  validateSecurity;/* Block dangerous patterns */

  const blockedPatterns = [
  
    "document.cookie",
  
    "localStorage",
  
    "sessionStorage",
  
    "fetch(",
  
    "XMLHttpRequest",
  
    "eval(",
  
    "Function("
  
  ];
  
  /* Validate generated files */
  
  const validateSecurity =
  (files) => {
  
    for (const file of files) {
  
      const content =
        file.content;
  
      for (const pattern of blockedPatterns) {
  
        if (
          content.includes(pattern)
        ) {
  
          throw new Error(
            `Blocked unsafe code: ${pattern}`
          );
  
        }
  
      }
  
    }
  
  };
  
  module.exports =
  validateSecurity;
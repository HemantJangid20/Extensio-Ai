/* Security validator */

const blockedPatterns = [

    "document.cookie",
  
    "eval(",
  
    "Function(",
  
    "<script>"
  
  ];
  
  /* Validate files */
  
  const validateSecurity =
  (files) => {
  
    if (!files) return;
  
    for (const file of files) {
  
      if (!file.content) continue;
  
      const content =
        file.content.toString();
  
      for (const pattern of blockedPatterns) {
  
        if (
          content.includes(pattern)
        ) {
  
          throw new Error(
            `🚨 Unsafe code detected: ${pattern}`
          );
  
        }
  
      }
  
    }
  
  };
  
  module.exports =
  validateSecurity;
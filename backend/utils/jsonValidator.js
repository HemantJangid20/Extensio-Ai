const Ajv = require("ajv");

const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    projectName: { type: "string" },

    files: {
      type: "array",

      items: {
        type: "object",

        properties: {
          filename: { type: "string" },

          content: { type: "string" },
        },

        required: ["filename", "content"],
      },
    },
  },

  required: ["projectName", "files"],
};

const validate = ajv.compile(schema);

function validateJSON(data) {
  const valid = validate(data);

  if (!valid) {
    throw new Error("Invalid JSON structure");
  }

  return true;
}

module.exports = validateJSON;
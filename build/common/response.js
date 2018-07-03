'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const succeed = exports.succeed = (res, data, code) => {
  if (typeof data == 'String' || data instanceof String) return res.status(code).json({ message: data });
  if (data === null) return res.status(code).json({ message: 'No data' });
  return res.status(code).json(data);
};

const failed = exports.failed = (res, message, code) => {
  return res.status(code).json({ message });
};

const errorValidation = exports.errorValidation = (res, data, code) => {
  console.log(data);
  return res.status(code).json({ error: data.name, message: data.message });
};
//# sourceMappingURL=response.js.map
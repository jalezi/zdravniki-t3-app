// Stylelint config for clean-order and prettier
// https://stylelint.io/user-guide/rules
// https://www.npmjs.com/package/stylelint-order
// https://www.npmjs.com/package/stylelint-config-prettier
// https://github.com/stylelint/awesome-stylelint

module.exports = {
  plugins: [
    // other plugins ...
    'stylelint-order',
  ],
  extends: [
    // other configs ...
    'stylelint-config-clean-order',
    'stylelint-config-prettier',
  ],
  rules: {
    'color-no-invalid-hex': true,
  },
};

const isDevelopment = !process.cwd().includes('apps/host');

module.exports = {
  extends: ['plugin:ezlint/react'],
  rules: {
    'import/no-unresolved': ['error', { ignore: ['^remote'] }],
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': isDevelopment
      ? [
          'error',
          {
            config: './apps/host/tailwind.config.cjs',
            removeDuplicates: true, // <--- defaults to true.
            classRegex: '(className|ClassName|class|Class)$', // <--- defaults to "^class(Name)?$"
          },
        ]
      : 'off',
  },
};

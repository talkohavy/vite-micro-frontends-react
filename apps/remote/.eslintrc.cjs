// const isDevelopment = !process.cwd().includes('apps/remote');

module.exports = {
  extends: ['plugin:ezlint/react'],
  rules: {
    // 'tailwindcss/no-custom-classname': 'off',
    // 'tailwindcss/classnames-order': isDevelopment
    //   ? [
    //       'error',
    //       {
    //         config: './apps/remote/tailwind.config.cjs',
    //         removeDuplicates: true, // <--- defaults to true.
    //         classRegex: '(className|ClassName|class|Class)$', // <--- defaults to "^class(Name)?$"
    //       },
    //     ]
    //   : 'off',
  },
};

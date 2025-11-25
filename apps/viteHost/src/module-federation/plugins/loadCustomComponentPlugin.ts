import type { ModuleFederationRuntimePlugin } from '@module-federation/enhanced/runtime';

/**
 * This plugin demonstrates how to delegate/redirect module requests.
 * When someone requests 'mf_books/App', we can redirect them to load
 * 'mf_books/Button' instead by intercepting the afterResolve hook.
 *
 * This is a more robust approach than hardcoding asset URLs because it
 * leverages Module Federation's built-in resolution mechanism.
 */
export default function loadCustomComponentPlugin(): ModuleFederationRuntimePlugin {
  return {
    name: 'load-custom-component-plugin',

    // Use afterResolve instead of loadEntry for a more robust solution
    async afterResolve(args) {
      const { id, pkgNameOrAlias, expose } = args;

      console.log('loadCustomComponentPlugin - afterResolve:', { id, pkgNameOrAlias, expose });

      // Intercept requests to mf_books/App and redirect to Button
      if (pkgNameOrAlias === 'mf_books' && expose === './App') {
        console.log('loadCustomComponentPlugin - delegating App to Button');

        // Modify the expose path to point to Button instead
        return {
          ...args,
          expose: './Button',
        };
      }

      return args;
    },
  };
}

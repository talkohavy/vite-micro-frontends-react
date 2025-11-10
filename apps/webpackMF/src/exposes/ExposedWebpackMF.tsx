import styles from './ExposedWebpackMF.module.scss';

export default function ExposedWebpackMF() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Webpack Micro Frontend</h1>
      <p className={styles.description}>
        This is a <strong>webpack-based</strong> micro-frontend using Module Federation.
      </p>
      <div className={styles.features}>
        <div className={styles.feature}>
          <h3>🔧 Webpack 5</h3>
          <p>Built with webpack and @module-federation/enhanced</p>
        </div>
        <div className={styles.feature}>
          <h3>⚛️ React 19</h3>
          <p>Latest React with TypeScript support</p>
        </div>
        <div className={styles.feature}>
          <h3>🎨 CSS Modules</h3>
          <p>Scoped styling with SCSS support</p>
        </div>
        <div className={styles.feature}>
          <h3>🔄 Hot Reload</h3>
          <p>Webpack dev server with HMR</p>
        </div>
      </div>
      <div className={styles.info}>
        <p>
          <strong>Port:</strong> 3003 | <strong>Name:</strong> mf_webpack
        </p>
        <p>
          <strong>Exposed as:</strong> <code>./App</code>
        </p>
      </div>
    </div>
  );
}

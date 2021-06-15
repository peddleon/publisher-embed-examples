import Head from 'next/head';
import Image from 'next/image'
import React, { useEffect } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  useEffect(() => {
    window.PeddlePublisherEmbed('boot', { target: '#unique-peddle-button' });
    window.PeddlePublisherEmbed('addEventListener', {
      event: 'open',
      // eslint-disable-next-line no-console
      listener: () => console.log('open!'),
    });
    window.PeddlePublisherEmbed('addEventListener', {
      event: 'close',
      // eslint-disable-next-line no-console
      listener: () => console.log('close!'),
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Next App Example of Publisher Embed Widget</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/javascript"
          dangerouslySetInnerHTML={{
            __html: `
PeddlePublisherEmbedConfig={publisherID:"118535"},function(){if("function"!=typeof window.PeddlePublisherEmbed){if(!window.PeddlePublisherEmbedConfig||!window.PeddlePublisherEmbedConfig.publisherID)throw new Error("Unable to bootstrap Peddle Publisher Embed, make sure to set PeddlePublisherEmbedConfig.publisherID");const e=(d,i)=>{e.queue.push({operation:d,options:i})};e.queue=[],window.PeddlePublisherEmbed=e;const d=()=>{const e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://publisher-embed.peddle.com/api/v1/embed/"+window.PeddlePublisherEmbedConfig.publisherID;const d=document.getElementsByTagName("script")[0];d.parentNode.insertBefore(e,d)};window.addEventListener("load",d,!1)}}();
`,
          }}
        />
      </Head>
      
      <main className={styles.main}>
        <h3 className={styles.title}>
        A Next.js example site for Peddle Publisher Embed implementation
        </h3>

        <p className={styles.description}>
        Lorem ipsum dolor sit amet
        </p>

        <div className={styles.grid}>
          <a  className={styles.card}>
            <h2>Lorem Ipsum &rarr;</h2>
            <p>Praesent aliquam ante euismod aliquet venenatis.</p>
          </a>

          <a  className={styles.card}>
            <h2>Vestibulum</h2>
            <p>Ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae!</p>
          </a>

          <a
            className={styles.card}
          >
            <h2>Curabitur &rarr;</h2>
            <p>Eget diam et enim elementum feugiat sed eget velit.</p>
          </a>

          <div className={styles.card}>
            <h2>Peddle Embed &rarr;</h2>
            <div id="unique-peddle-button" />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
    
      </footer>
    </div>
  );
}

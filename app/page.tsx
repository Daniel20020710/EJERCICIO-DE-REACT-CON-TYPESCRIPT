'use client';
import React, { MouseEventHandler, useState } from 'react';
import { LazyImage } from '@/components/RandomFox';
import {random} from 'lodash';
import './globals.css'



const myRandom = () => random(1, 123);
const generarId = () => Math.random().toString(36).substr(2, 9);

export default function Home() {
  const [images, setImages] = useState<Array<ImageItem>>([]);


  const mostarNuevoZorro: MouseEventHandler<HTMLButtonElement> = (event) => {
   
  

    const newImageItem = { id: generarId(), url: `https://randomfox.ca/images/${myRandom()}.jpg` };
    setImages([
      ...images, newImageItem
    ]);
    window.plausible("add_fox");
  }

  return (

    
    <main className="text-center">
      <PageContent></PageContent>

      <button onClick={mostarNuevoZorro} className="add-zorro-button py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Mostrar un nuevo Zorro</button>
      <div className='image-grid'>
      {images.map(({ id, url }, index) => (
        <div key={id.toString()} className='flex justify-center p-4  m-4 image-container'>
          <LazyImage onLazyLoad={(imageNode) => {
            console.log(`Image #${index + 1} cargada. Nodo:`, imageNode);
          }} className="rounded bg-gray-300" width={320} height="auto" src={url.toString()} onClick={() => console.log("hey")} />
        </div>
      ))}

      </div>
    
       <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.tagged-events.js"></script>

       <footer className="text-center mt-auto p-6 text-sm text-gray-500">
        <p>
          Images from{" "}
          <a href="https://randomfox.ca" target="_blank" rel="noreferrer">
            randomfox.ca
          </a>{" "}
          | Made by{" "}
          <a href="https://www.facebook.com/danielfelipe.balasnoapinto/">@danielbalasnoapinto 🦑</a> for{" "}
          <a href="https://twitter.com/platzi">@platzi</a>
        </p>
      </footer>
    </main>
  );

  function PageContent() {
    return (
      <div className="pt-10 pb-4 px-4 sm:px-6 lg:px-8">
        <p className="text-base leading-6 text-indigo-600 font-semibold tracking-wide uppercase">
          Ejercicio de React con TypeScript
        </p>
        <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          Componente Lazy Image
        </h3>
        <div className="max-w-xl mx-auto text-xl text-gray-500 leading-7">
          <p className="mt-4">
            Un componente genérico de React para cargar imágenes con lazy loading.
          </p>
       
        </div>
      </div>
    );
  }
}

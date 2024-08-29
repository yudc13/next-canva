"use client";

import { fabric } from "fabric";
import { useEffect, useRef } from "react";
import { useEditor } from "@/features/editor/hooks/useEditor";
import { Navbar } from '@/features/editor/components/Navbar';
import { Sidebar } from '@/features/editor/components/Sidebar';
import { Toolbar } from '@/features/editor/components/Toolbar';
import { Footer } from '@/features/editor/components/Footer';


const Editor = () => {
  const { init } = useEditor();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });
    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });
    return () => {
      canvas.dispose();
    }
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <Navbar />
      <div className={'absolute top-[68px] w-full h-[calc(100%-68px)] flex'}>
        <Sidebar />
        <main className={'flex-1 relative flex flex-col overflow-auto bg-slate-50 '}>
          <Toolbar />
          <div className="h-[calc(100%-176)] flex-1 bg-slate-50" ref={containerRef}>
            <canvas ref={canvasRef}/>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Editor;

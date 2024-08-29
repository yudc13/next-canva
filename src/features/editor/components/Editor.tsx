'use client';


import { ActiveTool } from '@/features/editor/types';
import { fabric } from 'fabric';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useEditor } from '@/features/editor/hooks/useEditor';
import { Navbar } from '@/features/editor/components/Navbar';
import { Sidebar } from '@/features/editor/components/Sidebar';
import { Toolbar } from '@/features/editor/components/Toolbar';
import { Footer } from '@/features/editor/components/Footer';
import { ColorFillSidebar } from '@/features/editor/components/ColorFillSidebar';
import { ShapesSidebar } from '@/features/editor/components/ShapesSidebar';


const Editor = () => {
	const {init, editor} = useEditor();

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const [activeTool, setActiveTool] = useState<ActiveTool>('select');

	const onChangeActiveTool = useCallback((tool: ActiveTool) => {
		if (tool === activeTool) {
			return setActiveTool('select');
		}

		setActiveTool(tool);
	}, [activeTool]);

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
		};
	}, [init]);

	return (
		<div className="h-full flex flex-col">
			<Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool}/>
			<div className={'absolute top-[68px] w-full h-[calc(100%-68px)] flex'}>
				<Sidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool}/>
				<ShapesSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool}/>
				<ColorFillSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool}/>
				<main className={'flex-1 relative flex flex-col overflow-auto bg-gray-100'}>
					<Toolbar
						editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool}
						key={JSON.stringify(editor?.canvas.getActiveObjects())}
					/>
					<div className="h-[calc(100%-176)] flex-1 bg-gray-100" ref={containerRef}>
						<canvas ref={canvasRef}/>
					</div>
					<Footer/>
				</main>
			</div>
		</div>
	);
};

export default Editor;

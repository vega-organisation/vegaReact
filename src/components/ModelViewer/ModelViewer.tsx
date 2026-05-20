'use client';

import { Component, Suspense, useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Bounds,
  Environment,
  OrbitControls,
  useGLTF,
  useProgress,
} from '@react-three/drei';
import { MathUtils } from 'three';
import type { Group } from 'three';
import { Loader } from '../Loader';
import type { ModelViewerProps } from './ModelViewer.types';
import './ModelViewer.css';

interface ModelProps {
  src: string;
  scale: number | [number, number, number];
  rotation: [number, number, number];
  position: [number, number, number];
  mouseParallax: boolean;
  mouseParallaxIntensity: number;
  onLoad?: () => void;
  onClick?: () => void;
}

function Model({
  src,
  scale,
  rotation,
  position,
  mouseParallax,
  mouseParallaxIntensity,
  onLoad,
  onClick,
}: ModelProps) {
  const { scene } = useGLTF(src);
  const groupRef = useRef<Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    onLoad?.();
  }, [src, onLoad]);

  useEffect(() => {
    if (!mouseParallax) return;
    const handler = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', handler);
    return () => window.removeEventListener('pointermove', handler);
  }, [mouseParallax]);

  const baseRotation: [number, number, number] = [
    MathUtils.degToRad(rotation[0]),
    MathUtils.degToRad(rotation[1]),
    MathUtils.degToRad(rotation[2]),
  ];

  useFrame(() => {
    if (!groupRef.current || !mouseParallax) return;
    const targetY = baseRotation[1] + target.current.x * mouseParallaxIntensity;
    const targetX = baseRotation[0] - target.current.y * mouseParallaxIntensity;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08;
  });

  const scaleVec: [number, number, number] =
    typeof scale === 'number' ? [scale, scale, scale] : scale;

  return (
    <group
      ref={groupRef}
      rotation={mouseParallax ? undefined : baseRotation}
      position={position}
      scale={scaleVec}
      onClick={
        onClick
          ? (e) => {
              e.stopPropagation();
              onClick();
            }
          : undefined
      }
    >
      <primitive object={scene} />
    </group>
  );
}

interface ErrorBoundaryProps {
  fallback: ReactNode;
  onError?: (err: Error) => void;
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ModelErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error): void {
    this.props.onError?.(error);
  }

  render() {
    if (this.state.error) return this.props.fallback;
    return this.props.children;
  }
}

function LoadingOverlay({ fallback }: { fallback: ReactNode }) {
  const { active } = useProgress();
  if (!active) return null;
  return <div className="vega-model-viewer__overlay">{fallback}</div>;
}

export function ModelViewer({
  src,
  width = '100%',
  height = 400,
  scale = 1,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  cameraPosition,
  cameraFov = 50,
  autoFrame = true,
  orbit = true,
  zoom = true,
  pan = false,
  autoRotate = false,
  autoRotateSpeed = 1,
  mouseParallax = false,
  mouseParallaxIntensity = 0.1,
  environment = 'studio',
  background,
  loadingFallback,
  errorFallback,
  onLoad,
  onError,
  onClick,
  className,
  style,
}: ModelViewerProps) {
  const wrapperStyle: CSSProperties = {
    width,
    height,
    background: background ?? 'transparent',
    ...style,
  };

  const containerClass = ['vega-model-viewer', className].filter(Boolean).join(' ');

  const errorNode = errorFallback ?? (
    <div className="vega-model-viewer__error">Failed to load 3D model.</div>
  );

  const loadingNode = loadingFallback ?? <Loader />;
  const fitCamera = autoFrame && !cameraPosition;
  const cameraConfig = {
    position: cameraPosition ?? ([0, 0, 5] as [number, number, number]),
    fov: cameraFov,
  };
  const controlsEnabled = orbit || zoom || pan || autoRotate;

  const modelNode = (
    <Model
      src={src}
      scale={scale}
      rotation={rotation}
      position={position}
      mouseParallax={mouseParallax}
      mouseParallaxIntensity={mouseParallaxIntensity}
      onLoad={onLoad}
      onClick={onClick}
    />
  );

  return (
    <div className={containerClass} style={wrapperStyle}>
      <ModelErrorBoundary fallback={errorNode} onError={onError}>
        <Canvas
          className="vega-model-viewer__canvas"
          camera={cameraConfig}
          gl={{ alpha: !background }}
        >
          <Suspense fallback={null}>
            <Environment preset={environment} />
            {fitCamera ? (
              <Bounds key={src} fit clip margin={1.2}>
                {modelNode}
              </Bounds>
            ) : (
              modelNode
            )}
            {controlsEnabled && (
              <OrbitControls
                enableRotate={orbit}
                enableZoom={zoom}
                enablePan={pan}
                autoRotate={autoRotate}
                autoRotateSpeed={autoRotateSpeed}
                makeDefault
              />
            )}
          </Suspense>
        </Canvas>
      </ModelErrorBoundary>
      <LoadingOverlay fallback={loadingNode} />
    </div>
  );
}

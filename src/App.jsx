import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense } from "react";
import { UI } from "./components/UI";

function App() {

  const isMobile = window.innerWidth < 768;

  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 9], fov: 42 }}>
        <color attach="background" args={["#171720"]} />
        {!isMobile && <fog attach="fog" args={["#171720", 10, 20]} />}
        <Suspense>
          <Experience />
        </Suspense>
        <EffectComposer>
          <Bloom mipmapBlur intensity={1.2}  />
        </EffectComposer>
      </Canvas>
      <UI />
    </>
  );
}

export default App;

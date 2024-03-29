import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense } from "react";
import { UI } from "./components/UI";
import { Loader } from "@react-three/drei";

function App() {

  const isMobile = window.innerWidth < 768;

  return (
    <>
      <Loader />
      <Canvas shadows camera={{ position: [0, 0, 9], fov: 42 }}>
        <color attach="background" args={["#171720"]} />
        {isMobile ? <fog attach="fog" args={["#171720", 5, 70]} /> : <fog attach="fog" args={["#171720", 0, 20]} />}
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

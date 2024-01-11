import { CameraControls, Environment, OrbitControls, Text, MeshReflectorMaterial, SpotLight, RenderTexture, Float, useVideoTexture } from "@react-three/drei";
import { Resume } from "./Resume";
import { degToRad } from "three/src/math/MathUtils";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Color, Vector3 } from "three";
import { Surfboard } from "../models/surfboard";
import { Casa } from "../models/casa";
import { useFont } from "@react-three/drei";
import { useAtom } from "jotai";
import { currentPageAtom } from "./UI";
import { lerp } from "three/src/math/MathUtils";
import * as THREE from "three";

const bloomColor = new Color("#fff");
bloomColor.multiplyScalar(1.01);

export const Experience = () => {

  const controls = useRef();
  const meshFitCameraHome = useRef();
  const meshFitCameraResume = useRef();
  const textmaterial = useRef();
  const resumeRef = useRef();
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)
  const [resumeRotation, setResumeRotation] = useState(degToRad(-15))

  useFrame((_, delta) => {
    textmaterial.current.opacity = lerp(textmaterial.current.opacity, currentPage === "home" || currentPage === "intro" ? 1 : 0.1, delta * 1.5)
    if (currentPage === "store") {
      resumeRef.current.rotation.y = lerp(resumeRef.current.rotation.y, degToRad(0), delta * 1.5)
    } else if (currentPage === "home" || currentPage === "intro") {
      resumeRef.current.rotation.y = lerp(resumeRef.current.rotation.y, degToRad(-30), delta * 1.5)
    }
  })


  const Intro = async () => {
    // 1. set the camera to start position
    controls.current.dolly(-20)
    // 2. slow down the camera movement
    controls.current.smoothTime = 1.6;
    setTimeout(() => {
      setCurrentPage("home")
    }, 1200)
    fitCamera();
  }

  const fitCamera = async () => {
    if (currentPage === "store") {
      controls.current.smoothTime = 0.6;
      controls.current.fitToBox(meshFitCameraResume.current, true)
    } else if (currentPage === "home" || currentPage === "intro") {
      controls.current.smoothTime = 1.6;
      controls.current.fitToBox(meshFitCameraHome.current, true)
    }
  }

  useEffect(() => {
    Intro();
  }, [])

  useEffect(() => {
    fitCamera();
    console.log(currentPage);
    window.addEventListener('resize', fitCamera);
    return () => window.removeEventListener('resize', fitCamera);
  }, [currentPage])

  const url = './mountain.mp4'
  const texture = useVideoTexture(url);

  return (
    <>


      <ambientLight intensity={1.5} />
      <directionalLight position={[0, 10, 0]} intensity={1.0} castShadow />

      <CameraControls ref={controls} />
      <mesh ref={meshFitCameraHome} position={[0, 0, 2]} rotation={[0, 0.1, 0]} visible={false}>
        <boxGeometry args={[8.5, 2, 2]} />
        <meshBasicMaterial color="red" transparent opacity={0.5}/>
      </mesh>

      <Text
        font={'fonts/ClashDisplay-Variable.ttf'}
        position-x={-1.3}
        position-y={-0.5}
        position-z={1}
        lineHeight={0.8}
        textAlign="start"
        rotation-y={degToRad(30)}
        >
        MATTHEW{"\n"}KETTELKAMP
        <meshBasicMaterial attach="material" color={bloomColor} toneMapped={false} ref={textmaterial} map={texture}>
          {/* if i want to use a model or 3d shape inside the texture un-comment */}
         {/* <RenderTexture attach={'map'}>
            <color attach="background" args={["white"]} />
            <Environment
              files={['./environmentMaps/1/px.jpg', './environmentMaps/1/nx.jpg', './environmentMaps/1/py.jpg', './environmentMaps/1/ny.jpg', './environmentMaps/1/pz.jpg', './environmentMaps/1/nz.jpg']}
              intensity={1}
              />
              <Float
                speed={.8} // Animation speed, defaults to 1
                rotationIntensity={5} // XYZ rotation intensity, defaults to 1
                floatIntensity={1.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
                floatingRange={[-2, 4]}
              >
                <mesh>
                  <boxGeometry args={[9, 7, 4]} />
                  <meshBasicMaterial color="blue" />
                </mesh>
              </Float>
         </RenderTexture> */}
        </meshBasicMaterial>

      </Text>

      {/* CAMERA BOX and RESUME */}
      <group position-x={3.5} position-y={.7} ref={resumeRef}>
        <Resume />
        <mesh ref={meshFitCameraResume} visible={false}>
          <boxGeometry args={[2, 4, 2]}/>
          <meshBasicMaterial color="red" transparent opacity={0.5}/>
        </mesh>
      </group>

      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} position-y={-1.25}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={1048}
          mixBlur={1}
          mixStrength={10}
          roughness={0.9}
          metalness={0.8}
          depthScale={1}
          opacity={0.5}
          transparent
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color={"#333"}
        />
      </mesh>

      <Environment
        files={['./environmentMaps/1/px.jpg', './environmentMaps/1/nx.jpg', './environmentMaps/1/py.jpg', './environmentMaps/1/ny.jpg', './environmentMaps/1/pz.jpg', './environmentMaps/1/nz.jpg']}
        intensity={1}
        />

      {/* <MovingSpot color="white" position={[1, 5, 0]} /> */}

    </>
  );
};

useFont.preload("fonts/ClashDisplay-Variable.ttf");


function MovingSpot({ vec = new Vector3(), ...props }) {
  const light = useRef()
  const viewport = useThree((state) => state.viewport)
  useFrame((state) => {
    light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
    light.current.target.updateMatrixWorld()
  })
  return <SpotLight castShadow ref={light} penumbra={1} distance={16} angle={0.85} attenuation={5} anglePower={4} intensity={2} {...props} />
}

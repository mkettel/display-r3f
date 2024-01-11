import React, { useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'
import { Environment } from '@react-three/drei'
import { Color } from 'three'

export const Resume = () => {

  const resumePlane = useRef()

  // File paths
  const [ darkResume, janResume ] = useLoader(TextureLoader, [
    './environmentMaps/dark-resume.png',
    './environmentMaps/resume-jan-24.png',
   ])

  const [texture, setTexture] = useState(janResume);

  const bloomColor = new Color("#fff");
  bloomColor.multiplyScalar(1.4);

  return <>
    {/* Resume Plane */}
    <mesh
      scale={1.3}
      ref={resumePlane}
      castShadow
      >
          {/* <planeGeometry args={[2.0, 2.5, 2]}/> */}
          <boxGeometry args={[2.0, 2.5, .05]}/>
          <meshStandardMaterial map={ texture } side={THREE.DoubleSide} metalness={1} roughness={1} color={bloomColor} />
      </mesh>
  </>

}

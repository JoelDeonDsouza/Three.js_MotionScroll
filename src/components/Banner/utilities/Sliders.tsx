import React, { useRef } from "react";
import { ImageProps, Image as ThreeImage, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Group } from "three";

function DreiImg(props: ImageProps) {
  const ref = useRef<any>(null);
  const group = useRef<any>(null);
  const data = useScroll();

  useFrame((state, delta) => {
    if (group.current && ref.current && data) {
      group.current.position.z = MathUtils.damp(
        group.current.position.z,
        Math.max(0, data.delta * 90),
        4,
        delta,
      );
      ref.current.material.grayscale = MathUtils.damp(
        ref.current.material.grayscale,
        Math.max(0, 0.2 - data.delta * 120),
        4,
        delta,
      );
    }
  });

  return (
    <group ref={group}>
      <ThreeImage ref={ref} {...props} />
    </group>
  );
}

function Slide({ urls = [""], ...props }) {
  const ref = useRef(null);
  const { width } = useThree((state) => state.viewport);
  const wImg = width < 10 ? 1.5 / 2 : 1 / 3;
  return (
    <group ref={ref} {...props}>
      <DreiImg position={[-width * wImg, 0, 0]} scale={[5, 8]} url={urls[0]} />
      <DreiImg position={[0, 0, 0]} scale={[7, 5]} url={urls[1]} />
      <DreiImg position={[width * wImg, 0, 1]} scale={[5, 5]} url={urls[2]} />
    </group>
  );
}

const Sliders = () => {
  const { width } = useThree((state) => state.viewport);
  return (
    <>
      <Slide
        position={[0, 0, 0]}
        urls={[
          "https://images.unsplash.com/photo-1518365050014-70fe7232897f?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1516850101085-b0970410ac63?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
          "https://images.unsplash.com/photo-1614729375290-b2a429db839b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8",
        ]}
      />
      <Slide
        position={[width * 1, 0, 0]}
        urls={[
          "https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2F0ZWxsaXRlfGVufDB8fDB8fHww",
          "https://images.unsplash.com/photo-1528499908559-b8e4e8b89bda?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2F0ZWxsaXRlfGVufDB8fDB8fHww",
        ]}
      />
    </>
  );
};

export default Sliders;

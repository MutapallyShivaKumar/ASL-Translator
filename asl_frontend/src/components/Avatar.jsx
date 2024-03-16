import React, { useEffect, useRef, useState } from 'react'
import { button, useControls } from "leva";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from '@react-three/drei'
import { useChat } from "../hooks/useChat";
export const  Avatar=(props)=> {
  const group = useRef()
  const avatar = useGLTF('/ramu(edit1).glb')
  const { actions,clips,names,mixer} = useAnimations(avatar.animations, avatar.scene)
  const { message, onMessagePlayed, chat } = useChat();
  const [audio, setAudio] = useState();
  useEffect(() => {
    console.log(message);
    if (!message) {
      setAnimation("idle");
      return;
    }  
    setAnimation(message.animation); 
    const audio = new Audio(message.audio);
    audio.play();
    setAudio(audio);
    audio.onended = onMessagePlayed;
  }, [message]);
  // const { clock } = useThree();     
  // const [animationFinished, setAnimationFinished] = useState(false);

  // useEffect(() => {
  //   const animation = new THREE.AnimationMixer(new THREE.Object3D());
  //   animation.addEventListener("onAnimationEnd", () => {
  //     setAnimationFinished(true);
  //   });
  //   console.log("finished");
  //   animation.update(clock.elapsedTime);

  //   return () => {
  //     animation.removeEventListener("onAnimationEnd");
  //   };
  // }, []);


  const [animation, setAnimation] = useState(
    avatar.animations.find((a) => a.name === "idle") ? "idle" : avatar.animations[3].name // Check if Idle animation exists otherwise use first animation
  );
  useEffect(() => {
    console.log(avatar.animations);
    actions[animation]
      .reset()
      .fadeIn(mixer.stats.actions.inUse === 0 ? 0 : 0.5)
      .play();
    // actions[animation].repetitions=1;
    return () => actions[animation].fadeOut(0.5);
  }, [animation]);
 

  return (    
    <group>
			<primitive
				object={avatar.scene}
			/>
		</group>  
    // <group ref={group} {...props} dispose={null}>
    //   <group name="Scene">
    //     <group name="Armature">
    //       <primitive object={nodes.Hips} />
    //       <skinnedMesh name="Wolf3D_Body"
    //        geometry={nodes.Wolf3D_Body.geometry}
    //        material={materials.Wolf3D_Body} 
    //        skeleton={nodes.Wolf3D_Body.skeleton} />

    //       <skinnedMesh name="Wolf3D_Glasses" 
    //       geometry={nodes.Wolf3D_Glasses.geometry} 
    //       material={materials.Wolf3D_Glasses} 
    //       skeleton={nodes.Wolf3D_Glasses.skeleton} />
          
    //       <skinnedMesh name="Wolf3D_Hair" 
    //       geometry={nodes.Wolf3D_Hair.geometry} 
    //       material={materials.Wolf3D_Hair} 
    //       skeleton={nodes.Wolf3D_Hair.skeleton} />

    //       <skinnedMesh name="Wolf3D_Outfit_Bottom" 
    //       geometry={nodes.Wolf3D_Outfit_Bottom.geometry} 
    //       material={materials.Wolf3D_Outfit_Bottom} 
    //       skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />

    //       <skinnedMesh name="Wolf3D_Outfit_Footwear" 
    //       geometry={nodes.Wolf3D_Outfit_Footwear.geometry} 
    //       material={materials.Wolf3D_Outfit_Footwear} 
    //       skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />

    //       <skinnedMesh name="Wolf3D_Outfit_Top" 
    //       geometry={nodes.Wolf3D_Outfit_Top.geometry} 
    //       material={materials.Wolf3D_Outfit_Top} 
    //       skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />

    //       <skinnedMesh name="EyeLeft" 
    //       geometry={nodes.EyeLeft.geometry} 
    //       material={materials.Wolf3D_Eye} 
    //       skeleton={nodes.EyeLeft.skeleton} />

    //       <skinnedMesh name="EyeRight" 
    //       geometry={nodes.EyeRight.geometry} 
    //       material={materials.Wolf3D_Eye} 
    //       skeleton={nodes.EyeRight.skeleton} />

    //       <skinnedMesh name="Wolf3D_Head" 
    //       geometry={nodes.Wolf3D_Head.geometry} 
    //       material={materials.Wolf3D_Skin} 
    //       skeleton={nodes.Wolf3D_Head.skeleton} />

    //       <skinnedMesh name="Wolf3D_Teeth" 
    //       geometry={nodes.Wolf3D_Teeth.geometry} 
    //       material={materials.Wolf3D_Teeth} 
    //       skeleton={nodes.Wolf3D_Teeth.skeleton} />

    //     </group>
    //   </group>
    // </group>
  )
}

useGLTF.preload('/ramu(edit1).glb')

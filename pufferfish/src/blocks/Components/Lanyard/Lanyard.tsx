/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

/* eslint-disable react/no-unknown-property */
"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
    useGLTF,
    useTexture,
    Environment,
    Lightformer,
} from "@react-three/drei";
import {
    BallCollider,
    CuboidCollider,
    Physics,
    RigidBody,
    useRopeJoint,
    useSphericalJoint,
    RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

// replace with your own imports, see the usage snippet for details
const cardGLB = "/card.glb";
import lanyard from "./lanyard.png";

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
    position?: [number, number, number];
    gravity?: [number, number, number];
    fov?: number;
    transparent?: boolean;
    cardScale?: number;
    onLoad?: () => void; // New callback for when assets are loaded
}

export default function Lanyard({
    position = [0, 0, 30],
    gravity = [0, -40, 0],
    fov = 20,
    transparent = true,
    cardScale = 1,
    onLoad, // New onLoad prop
}: LanyardProps) {
    return (
        <div className="relative z-0 w-full h-full">
            <Canvas
                camera={{ position, fov }}
                gl={{ alpha: transparent }}
                onCreated={({ gl }) =>
                    gl.setClearColor(
                        new THREE.Color(0x000000),
                        transparent ? 0 : 1
                    )
                }
            >
                <ambientLight intensity={Math.PI} />
                <Physics gravity={gravity} timeStep={1 / 60}>
                    <Band cardScale={cardScale} onLoad={onLoad} />
                </Physics>
                <Environment blur={0.75}>
                    <Lightformer
                        intensity={2}
                        color="white"
                        position={[0, -1, 5]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={3}
                        color="white"
                        position={[-1, -1, 1]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={3}
                        color="white"
                        position={[1, 1, 1]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={10}
                        color="white"
                        position={[-10, 0, 14]}
                        rotation={[0, Math.PI / 2, Math.PI / 3]}
                        scale={[100, 10, 1]}
                    />
                </Environment>
            </Canvas>
        </div>
    );
}

interface BandProps {
    maxSpeed?: number;
    minSpeed?: number;
    cardScale?: number;
    onLoad?: () => void;
}

function Band({
    maxSpeed = 50,
    minSpeed = 0,
    cardScale = 1,
    onLoad,
}: BandProps) {
    // Using "any" for refs since the exact types depend on Rapier's internals
    const band = useRef<any>(null);
    const fixed = useRef<any>(null);
    const j1 = useRef<any>(null);
    const j2 = useRef<any>(null);
    const j3 = useRef<any>(null);
    const card = useRef<any>(null);

    const vec = new THREE.Vector3();
    const ang = new THREE.Vector3();
    const rot = new THREE.Vector3();
    const dir = new THREE.Vector3();

    const segmentProps: any = {
        type: "dynamic" as RigidBodyProps["type"],
        canSleep: true,
        colliders: false,
        angularDamping: 4,
        linearDamping: 4,
    };

    const { nodes, materials } = useGLTF(cardGLB) as any;
    const texture = useTexture(lanyard.src);
    useEffect(() => {
        if (nodes && materials && texture && onLoad) {
            onLoad();
        }
    }, [nodes, materials, texture, onLoad]);

    const [curve] = useState(
        () =>
            new THREE.CatmullRomCurve3([
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
            ])
    );
    const [dragged, drag] = useState<false | THREE.Vector3>(false);
    const [hovered, hover] = useState(false);

    const [isSmall, setIsSmall] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            return window.innerWidth < 1024;
        }
        return false;
    });

    useEffect(() => {
        const handleResize = (): void => {
            setIsSmall(window.innerWidth < 1024);
        };

        window.addEventListener("resize", handleResize);
        return (): void => window.removeEventListener("resize", handleResize);
    }, []);

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    useSphericalJoint(j3, card, [
        [0, 0, 0],
        [0, 1.45, 0],
    ]);

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? "grabbing" : "grab";
            return () => {
                document.body.style.cursor = "auto";
            };
        }
    }, [hovered, dragged]);

    useFrame((state, delta) => {
        if (dragged && typeof dragged !== "boolean") {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(
                state.camera
            );
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
            card.current?.setNextKinematicTranslation({
                x: vec.x - dragged.x,
                y: vec.y - dragged.y,
                z: vec.z - dragged.z,
            });
        }
        if (
            fixed.current &&
            j1.current &&
            j2.current &&
            j3.current &&
            card.current &&
            band.current?.geometry
        ) {
            // Get translations and validate they're not NaN
            const fixedTranslation = fixed.current.translation();
            const j1Translation = j1.current.translation();
            const j2Translation = j2.current.translation();
            const j3Translation = j3.current.translation();

            // Only proceed if all translations are valid numbers
            if (
                fixedTranslation &&
                !isNaN(fixedTranslation.x) &&
                !isNaN(fixedTranslation.y) &&
                !isNaN(fixedTranslation.z) &&
                j1Translation &&
                !isNaN(j1Translation.x) &&
                !isNaN(j1Translation.y) &&
                !isNaN(j1Translation.z) &&
                j2Translation &&
                !isNaN(j2Translation.x) &&
                !isNaN(j2Translation.y) &&
                !isNaN(j2Translation.z) &&
                j3Translation &&
                !isNaN(j3Translation.x) &&
                !isNaN(j3Translation.y) &&
                !isNaN(j3Translation.z)
            ) {
                [j1, j2].forEach((ref) => {
                    if (!ref.current.lerped)
                        ref.current.lerped = new THREE.Vector3().copy(
                            ref.current.translation()
                        );

                    // Validate that lerped position is valid
                    const currentTranslation = ref.current.translation();
                    if (
                        isNaN(currentTranslation.x) ||
                        isNaN(currentTranslation.y) ||
                        isNaN(currentTranslation.z)
                    ) {
                        return; // Skip this iteration if translation is invalid
                    }

                    // Validate lerped position before using it
                    if (
                        isNaN(ref.current.lerped.x) ||
                        isNaN(ref.current.lerped.y) ||
                        isNaN(ref.current.lerped.z)
                    ) {
                        ref.current.lerped.copy(currentTranslation); // Reset to current position
                    }

                    const clampedDistance = Math.max(
                        0.1,
                        Math.min(
                            1,
                            ref.current.lerped.distanceTo(currentTranslation)
                        )
                    );
                    ref.current.lerped.lerp(
                        currentTranslation,
                        delta *
                            (minSpeed + clampedDistance * (maxSpeed - minSpeed))
                    );
                });

                // Validate lerped positions before using them
                const j1Lerped = j1.current.lerped;
                const j2Lerped = j2.current.lerped;

                if (
                    !j1Lerped ||
                    !j2Lerped ||
                    isNaN(j1Lerped.x) ||
                    isNaN(j1Lerped.y) ||
                    isNaN(j1Lerped.z) ||
                    isNaN(j2Lerped.x) ||
                    isNaN(j2Lerped.y) ||
                    isNaN(j2Lerped.z)
                ) {
                    return; // Skip this frame if lerped positions are invalid
                }

                // Update curve points with validated positions
                curve.points[0].copy(j3Translation);
                curve.points[1].copy(j2Lerped);
                curve.points[2].copy(j1Lerped);
                curve.points[3].copy(fixedTranslation);

                // Get curve points and validate them before setting
                try {
                    const curvePoints = curve.getPoints(32);
                    if (
                        curvePoints.length > 0 &&
                        curvePoints.every(
                            (point) =>
                                point &&
                                typeof point.x === "number" &&
                                typeof point.y === "number" &&
                                typeof point.z === "number" &&
                                !isNaN(point.x) &&
                                !isNaN(point.y) &&
                                !isNaN(point.z) &&
                                isFinite(point.x) &&
                                isFinite(point.y) &&
                                isFinite(point.z)
                        )
                    ) {
                        band.current.geometry.setPoints(curvePoints);
                    }
                } catch (error) {
                    console.warn("Error updating curve geometry:", error);
                }

                // Validate angular velocity and rotation before setting
                const angvel = card.current.angvel();
                const rotation = card.current.rotation();

                if (
                    angvel &&
                    rotation &&
                    !isNaN(angvel.x) &&
                    !isNaN(angvel.y) &&
                    !isNaN(angvel.z) &&
                    !isNaN(rotation.x) &&
                    !isNaN(rotation.y) &&
                    !isNaN(rotation.z)
                ) {
                    ang.copy(angvel);
                    rot.copy(rotation);
                    card.current.setAngvel({
                        x: ang.x,
                        y: ang.y - rot.y * 0.25,
                        z: ang.z,
                    });
                }
            }
        }
    });

    curve.curveType = "chordal";
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    return (
        <>
            <group position={[0, 4, 0]}>
                <RigidBody
                    ref={fixed}
                    {...segmentProps}
                    type={"fixed" as RigidBodyProps["type"]}
                />
                <RigidBody
                    position={[0.5, 0, 0]}
                    ref={j1}
                    {...segmentProps}
                    type={"dynamic" as RigidBodyProps["type"]}
                >
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody
                    position={[1, 0, 0]}
                    ref={j2}
                    {...segmentProps}
                    type={"dynamic" as RigidBodyProps["type"]}
                >
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody
                    position={[1.5, 0, 0]}
                    ref={j3}
                    {...segmentProps}
                    type={"dynamic" as RigidBodyProps["type"]}
                >
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody
                    position={[2, 0, 0]}
                    ref={card}
                    {...segmentProps}
                    type={
                        dragged
                            ? ("kinematicPosition" as RigidBodyProps["type"])
                            : ("dynamic" as RigidBodyProps["type"])
                    }
                >
                    <CuboidCollider args={[0.8, 1.125, 0.01]} />
                    <group
                        scale={2.25}
                        position={[0, -1.2, -0.05]}
                        onPointerOver={() => hover(true)}
                        onPointerOut={() => hover(false)}
                        onPointerUp={(e: any) => {
                            e.target.releasePointerCapture(e.pointerId);
                            drag(false);
                        }}
                        onPointerDown={(e: any) => {
                            e.target.setPointerCapture(e.pointerId);
                            drag(
                                new THREE.Vector3()
                                    .copy(e.point)
                                    .sub(vec.copy(card.current.translation()))
                            );
                        }}
                    >
                        <group scale={cardScale}>
                            <mesh geometry={nodes.card.geometry}>
                                <meshPhysicalMaterial
                                    map={materials.base.map}
                                    map-anisotropy={16}
                                    clearcoat={1}
                                    clearcoatRoughness={0.15}
                                    roughness={0.9}
                                    metalness={0.8}
                                />
                            </mesh>
                            <mesh
                                geometry={nodes.clip.geometry}
                                material={materials.metal}
                                material-roughness={0.3}
                            />
                            <mesh
                                geometry={nodes.clamp.geometry}
                                material={materials.metal}
                            />
                        </group>
                    </group>
                </RigidBody>
            </group>
            <mesh ref={band}>
                <meshLineGeometry />
                <meshLineMaterial
                    color="white"
                    depthTest={false}
                    resolution={isSmall ? [1000, 2000] : [1000, 1000]}
                    useMap
                    map={texture}
                    repeat={[-4, 1]}
                    lineWidth={1}
                />
            </mesh>
        </>
    );
}

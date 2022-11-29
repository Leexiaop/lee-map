
import {useEffect} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const Points = () => {
    useEffect(() => {
        init();
    }, []);

    const init = () => {
        const points = document.getElementById('points');
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, points.clientWidth / points.clientHeight, 0.1, 1000);
        camera.position.set(10, 10, 10);
        scene.add(camera);

        const sphereGemotery = new THREE.SphereGeometry(3, 30, 30);
        const textureLoader = new THREE.TextureLoader();
        const pointsMaterial = new THREE.PointsMaterial({
            color: 0xfff000,
            size: 0.1,
            sizeAttenuation: true,
            map: textureLoader.load(require('@/assets/texture/particles/4.png')),
            alphaMap: textureLoader.load(require('@/assets/texture/particles/4.png')),
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        const pointsCube = new THREE.Points(sphereGemotery, pointsMaterial);
        scene.add(pointsCube);

        const axesHelper = new THREE.AxesHelper(6, 6, 6);
        scene.add(axesHelper);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(points.clientWidth, points.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.physicallyCorrectLights = true;
        points.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const render = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        };
        render();
        window.addEventListener('dblclick', () => {
            const fullscreenElement = document.fullscreenElement;
            if (!fullscreenElement) {
                renderer.domElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });
        window.addEventListener('resize', () => {
            camera.aspect = points.clientWidth / points.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(points.clientWidth, points.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
        });
    };

    return <div id="points" className="case" />;
};

export default Points;

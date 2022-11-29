import {useEffect} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const Particles = () => {
    useEffect(() => {
        init();
    }, []);

    const init = () => {
        const particles = document.getElementById('particles');
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, particles.clientWidth / particles.clientHeight, 0.1, 1000);
        camera.position.set(10, 10, 10);
        scene.add(camera);

        const particlesGemotry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial();
        const particlesCube = new THREE.Mesh(particlesGemotry, material);
        scene.add(particlesCube);

        const axesHelper = new THREE.AxesHelper(6, 6, 6);
        scene.add(axesHelper);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(particles.clientWidth, particles.clientHeight);
        particles.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const render = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        };
        render();
    };

    return <div id="particles" className="case"/>;
};

export default Particles;

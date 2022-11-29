import {useEffect, useState} from 'react';
import {Spin} from 'antd';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const DoorCase = () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        //  获取画布
        const door = document.getElementById('door');
        //  创建场景
        const scene = new THREE.Scene();
        //  创建相机
        const camera = new THREE.PerspectiveCamera(75, door.clientWidth / door.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 10);
        scene.add(camera);
        //  创建几何物体
        const geometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100);
        //  创建进度管理
        const loadingManager = new THREE.LoadingManager();
        loadingManager.onProgress = (_, itemsLoaded, itemsTotal) => {
            setValue((itemsLoaded / itemsTotal).toFixed());
        };
        //  导入纹理
        const textureLoader = new THREE.TextureLoader(loadingManager);
        const doorTexture = textureLoader.load(require('@/assets/texture/door/color.jpg'));
        const doorAplhaTexture = textureLoader.load(require('@/assets/texture/door/alpha.jpg'));
        const doorAmbientOcclusionTexture = textureLoader.load(require('@/assets/texture/door/ambientOcclusion.jpg'));
        const doorHeightTexture = textureLoader.load(require('@/assets/texture/door/height.jpg'));
        const doorRoughnessTexture = textureLoader.load(require('@/assets/texture/door/roughness.jpg'));
        const doorMetalnessTexrure = textureLoader.load(require('@/assets/texture/door/metalness.jpg'));
        const doorNormalTexture = textureLoader.load(require('@/assets/texture/door/normal.jpg'));
        //  设置纹理的偏移
        //  doorTexture.offset.set(0.5, 0.5);
        //  设置纹理的旋转
        //  doorTexture.rotation = Math.PI / 4;
        //  设置旋转的中心点位置
        //  doorTexture.center.set(0.5, 0.5);
        //  设置纹理重复
        // doorTexture.repeat.set(2, 3);
        //  设置纹理的重复模式
        doorTexture.wrapS = THREE.MirroredRepeatWrapping;
        doorTexture.wrapT = THREE.RepeatWrapping;
        //  设置纹理显示设置
        doorTexture.minFilter = THREE.NearestFilter;
        doorTexture.magFilter = THREE.NearestFilter;
        //  创建材质
        const material = new THREE.MeshStandardMaterial({
            color: 0xffff00,
            map: doorTexture,
            alphaMap: doorAplhaTexture,
            transparent: true,
            aoMap: doorAmbientOcclusionTexture,
            aoMapIntensity: 0.5,
            displacementMap: doorHeightTexture,
            displacementScale: 0.05,
            roughness: 1,
            roughnessMap: doorRoughnessTexture,
            metalness: 1,
            metalnessMap: doorMetalnessTexrure,
            normalMap: doorNormalTexture
        });
        material.side = THREE.DoubleSide;
        //  创建网格
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        geometry.setAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2));

        //  添加平面
        const planeGeometry = new THREE.PlaneGeometry(1, 1, 200, 200);
        const plane = new THREE.Mesh(planeGeometry, material);
        plane.position.set(2, 0, 0);
        scene.add(plane);
        planeGeometry.setAttribute('uv2', new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2));
        //  创建渲染对象
        const renderer = new THREE.WebGLRenderer();
        //  设置渲染的尺寸
        renderer.setSize(door.clientWidth, door.clientHeight);
        //  将webgl渲染的canvas添加到画布中
        door.appendChild(renderer.domElement);
        //  创建控制器
        const controls = new OrbitControls(camera, renderer.domElement);
        //  添加阻尼，使得动画更逼真
        controls.enableDamping = true;
        //  添加坐标轴
        const axesHelper = new THREE.AxesHelper(6, 6, 6);
        scene.add(axesHelper);
        //  添加环境光
        const light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);
        //  设置平行光
        const directLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directLight.position.set(2, 5, 10);
        scene.add(directLight);
        // renderer.render(scene, camera);
        const render = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        };
        render();
        //  动态适配窗口大小
        window.addEventListener('resize', () => {
            camera.aspect = door.clientWidth / door.clientHeight;
            //   更新摄像机的投影矩阵
            camera.updateProjectionMatrix();
            //   更新渲染器
            renderer.setSize(door.clientWidth, door.clientHeight);
            //   设置渲染器的像素比
            renderer.setPixelRatio(window.devicePixelRatio);
        });
        window.addEventListener('dblclick', () => {
            const fullScreenElement = document.fullscreenElement;
            if (!fullScreenElement) {
                renderer.domElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });
    };

    return (
        <>
            <div id="door" className="case" />
            {
                value < 1 ? (
                    <div className="mask">
                        <Spin tip={`加载中${value * 100}%...`} size="large" />
                    </div>
                ) : null
            }
        </>
    );
};

export default DoorCase;

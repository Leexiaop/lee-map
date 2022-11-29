export default [
    {
        path: '/threejs',
        redirect: '/threejs/door'
    },
    {
        path: '/threejs/door',
        component: '@/pages/Threejs/Door/index',
        label: '门案例',
        key: '5-1'
    },
    {
        path: '/threejs/env-jpg',
        component: '@/pages/Threejs/EnvTextureJpg/index',
        label: 'JPG环境纹理',
        key: '5-2'
    },
    {
        path: '/threejs/env-hdr',
        component: '@/pages/Threejs/EnvTextureHdr/index',
        label: 'HDR环境纹理',
        key: '5-3'
    },
    {
        path: '/threejs/light',
        component: '@/pages/Threejs/Light/index',
        label: '光影案例',
        key: '5-4'
    },
    {
        path: '/threejs/point-light',
        component: '@/pages/Threejs/PointLight/index',
        label: '点光源案例',
        key: '5-5'
    },
    {
        path: '/threejs/spot-light',
        component: '@/pages/Threejs/SpotLight/index',
        label: '聚光灯案例',
        key: '5-6'
    },
    {
        path: '/threejs/points',
        component: '@/pages/Threejs/Points/index',
        label: '点材质',
        key: '5-7'
    },
    {
        path: '/threejs/points',
        component: '@/pages/Threejs/Points/index',
        label: '星光案例',
        key: '5-8'
    }
];

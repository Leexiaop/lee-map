import threejsRouter from './threejsRouter';
export default [
    {
        path: '/',
        redirect: '/bd'
    },
    {
        path: '/bd',
        component: '@/pages/BDMap/index',
        label: 'BDMap',
        key: '1'
    },
    {
        path: '/hd',
        component: '@/pages/HDMap/index',
        label: 'HDMap',
        key: '2'
    },
    {
        path: '/openlayer',
        component: '@/pages/Openlayer/index',
        label: 'OpenLayer',
        key: '3'
    },
    {
        path: '/cesiumjs',
        component: '@/pages/Cesiumjs/index',
        label: 'Cesiumjs',
        key: '4'
    },
    {
        path: '/threejs',
        component: '@/pages/Threejs/index',
        routes: threejsRouter,
        label: 'Threejs',
        key: '5'
    }
];

// types/meshline.d.ts
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { Object3DNode } from '@react-three/fiber'

declare module 'meshline' {
    export { MeshLineGeometry, MeshLineMaterial }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>
            meshLineMaterial: Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>
        }
    }
}

export { }

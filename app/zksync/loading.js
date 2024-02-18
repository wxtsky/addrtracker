// "use client";
// import TweenOne from 'rc-tween-one';
//
// export default function Loading() {
//
//     return (
//         <div style={{textAlign: 'center', marginTop: 100}}>
//             <TweenOne
//                 animation={{
//                     x: 100,
//                     y: 100,
//                     scale: 1.5,
//                     rotate: 360,
//                     backgroundColor: '#1890ff',
//                     duration: 1000,
//                     ease: 'easeInOutQuad', // 缓动函数，使动画更加流畅
//                     yoyo: true,
//                     repeat: -1,
//                 }}
//                 style={{
//                     width: 100,
//                     height: 100,
//                     borderRadius: '50%', // 圆形
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                 }}
//             >
//                 <div style={{color: 'white', fontSize: 20}}>Loading...</div>
//             </TweenOne>
//         </div>
//     );
// }
import {Spin} from "antd";

export default function Loading() {
    return (
        <Spin size="large"/>
    )
}
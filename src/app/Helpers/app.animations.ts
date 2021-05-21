import { animate, group, query, state, style, transition, trigger } from "@angular/animations";

// export const slideInOutAnimation = trigger(
//     'inOutAnimation', 
//     [
//       transition(
//         ':enter', 
//         [
//           style({ position: 'fixed', width: '100%', zIndex: 20, transform: 'translateX(100%)' }),
//           animate('1s ease-out', 
//                   style({ transform: 'translateX(0%)' }))
//         ]
//       ),
//       transition(
//         ':leave', 
//         [
//           style({ position: 'fixed', width: '100%', zIndex: 20, transform: 'translateX(0%)' }),
//           animate('1s ease-in', 
//                   style({ transform: 'translateX(-100%)' }))
//         ]
//       )
//     ]
// )

// export const slideInOutAnimation = trigger( 'inOutAnimation', [
//     transition('* <=> *', [
//         query(':enter, :leave', style({ position: 'fixed', width: '100%', zIndex: 20 }), {optional: true}),
//         group([
//             query(':enter', [
//                 style({ transform: 'translateX(100%)' }),
//                 animate('0.5s ease-out', style({ transform: 'translateX(0%)' }))
//             ], {optional: true }),
//             query(':leave', [
//                 style({ transform: 'translateX(0%)' }),
//                 animate('0.5s ease-out', style({ transform: 'translateX(-100%)' }))
//             ], {optional: true })
//         ])
//     ])
// ])

// export const slideInOutAnimation = trigger('inOutAnimation', [
//     state('void', style({ opacity: 0, })),
//     state('*', style({ opacity: 1, })),
//     transition(':enter', animate(`1000ms ease-out`)),
//     transition(':leave', animate(`1000ms ease-in`))
// ])




// animations: [
//     trigger('inOutAnimation', [
//         transition('void => *', [
//             style({transform: 'translateX(-100%)'}),
//             animate(1000)
//         ]),
//         transition('* => void', [
//             animate(1000,
//                 style({transform: 'translateX(100%)'}))
//         ]),
//     ])
// ]


export const slideInOutAnimation = trigger('inOutAnimation', [      
    transition(':enter', [
      style({ opacity: '0%' }),
      animate(300, style({ opacity: '100%' }))
    ]),
    transition(':leave', [
      animate(300, style({ opacity: '0%' }))
    ]),
    state('*', style({ opacity: '100%' })),
  ])
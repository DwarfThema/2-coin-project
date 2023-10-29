import { atom } from "recoil";

export const sequenceIntState = atom({
  key: "sequenceIntState", // unique ID (with respect to other atoms/selectors)
  default: 1, // true: kr / false: en
});

/* 
0 : Loading State
1 : Set Init (Cam Moving)
2 : Visible Euro
3 : Euro Rotate 
4 : Lit On
5 : Lit On Fin
6 : Euro Insert Anim
7 : Euro Insert Anim Fin
8 : Euro Close Anim Fin & camaera Move to Front Fin
9 : LockAnim Ing
10 : LockAnim Fin
11 : view From Top
12 : Fin Board Ing
13 : Fin Board On

*/

export const litRotTime = atom({
  key: "litRotTime",
  default: 0,
});

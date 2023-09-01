// ici on copie colle la doc : https://react-redux.js.org/using-react-redux/usage-with-typescript

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

// on defini des customHooks à utiliser à la place de `useDispatch` et `useSelector`
// ce sont les meme fonction mais avec le type en +
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

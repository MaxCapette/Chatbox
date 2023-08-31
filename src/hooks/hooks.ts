import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store/store';

// eslint-disable-next-line import/prefer-default-export
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

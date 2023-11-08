import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatchType, StateType } from '../types/state';

// TODO: Можно ли в index.ts который является реэкспортом добавлять дополнительный код?
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;

export * from './use-map-with-points/use-map-with-points';

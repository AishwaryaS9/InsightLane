import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, RootState, AppStore } from './index'


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()
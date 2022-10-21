import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../bll/store";
import {useRef} from "react";

export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

export function useIsFirstRender(): boolean {
    const isFirst = useRef(true)
    if (isFirst.current) {
        isFirst.current = false
        return true
    }
    return isFirst.current
}
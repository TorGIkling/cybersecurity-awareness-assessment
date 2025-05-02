import {createContext, ReactNode, useContext} from "react";
import UseMultistepForm from "../components/useMultistepForm/useMultistepForm";

const MultistepFormContext = createContext<any>(null);

export const MultistepFormProvider = ({children}: {children:ReactNode}) => {
    const multistepForm = UseMultistepForm();

    return <MultistepFormContext.Provider value={multistepForm}>
        {children}
    </MultistepFormContext.Provider>
}

export const useMultistepFormContext = () => {
    return useContext(MultistepFormContext);
}
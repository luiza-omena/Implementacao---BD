import { createContext, useState } from "react"
import { Obra } from "../types/Obra"

interface IHomeContext {
	obras: Obra[] 
	setObras: (obras: []) => void
	openUserCredentialsModal: boolean
	setOpenUserCredentialsModal: (openUserCredentialsModal: boolean) => void
}

export const HomeContext = createContext<IHomeContext>({} as IHomeContext)

const HomeProvider = (props: any) => {

	const [obras, setObras] = useState<Obra[]>([] as Obra[])
	const [openUserCredentialsModal, setOpenUserCredentialsModal] = useState<boolean>(false)

	return (
		<HomeContext.Provider
			value={{
				obras, setObras,
				openUserCredentialsModal, setOpenUserCredentialsModal,
			}}
		>
			{props.children}
		</HomeContext.Provider>
	)
}
export default HomeProvider

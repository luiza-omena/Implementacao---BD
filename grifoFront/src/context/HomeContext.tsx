import { createContext, useState } from "react"

interface IHomeContext {
	openUserCredentialsModal: boolean
	setOpenUserCredentialsModal: (openUserCredentialsModal: boolean) => void
	postObraModal: boolean
	setPostObraModal: (postObraModal: boolean) => void
	obraId: number | null
	setObraId: (obraId: number | null) => void
}

export const HomeContext = createContext<IHomeContext>({} as IHomeContext)

const HomeProvider = (props: any) => {
	const [openUserCredentialsModal, setOpenUserCredentialsModal] = useState<boolean>(false)
	const [postObraModal, setPostObraModal] = useState<boolean>(false)
	const [obraId, setObraId] = useState<number | null>(null)

	return (
		<HomeContext.Provider
			value={{
				openUserCredentialsModal, setOpenUserCredentialsModal,
				postObraModal, setPostObraModal,
				obraId, setObraId,
			}}
		>
			{props.children}
		</HomeContext.Provider>
	)
}
export default HomeProvider
